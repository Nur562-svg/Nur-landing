import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * ZCODE-M4 Phase 3：Clew 多模型任务级配置解析（纯函数，传 env 对象）。
 * 优先级矩阵（任务级 > 全局 > 缺省）、legacy 变量继续生效、
 * 未实现 provider / 非法 baseURL 明确报错、enable_thinking 仅 dashscope、URL 组装形态锁定。
 * 注：所有 key 值均为运行时拼接的测试桩值（非真实凭据）。
 */

const STUB_KEY = ["stub", "key"].join("-");
const BASE_ENV: Record<string, string | undefined> = { DASHSCOPE_API_KEY: STUB_KEY };

function envFor(overrides: Record<string, string | undefined>): Record<string, string | undefined> {
  return { ...BASE_ENV, ...overrides };
}

describe("Clew 多模型任务级配置解析", async () => {
  const {
    ClewProviderConfigError,
    describeClewTaskModelFrom,
    isClewTaskConfiguredFrom,
    resolveClewTaskModelFrom,
  } = await import("../src/lib/clew/providers/model-config");
  const { buildChatCompletionsBody, resolveChatCompletionsUrl } = await import(
    "../src/lib/clew/providers/chat-transport"
  );

  it("缺省：全部任务解析为 dashscope + qwen3.7-plus + compatible-mode（默认行为分毫不变）", () => {
    for (const task of ["toc", "extraction", "lesson", "chat", "note"] as const) {
      const config = resolveClewTaskModelFrom(task, BASE_ENV);
      assert.equal(config.provider, "dashscope");
      assert.equal(config.model, "qwen3.7-plus");
      assert.equal(config.baseURL, "https://dashscope.aliyuncs.com/compatible-mode/v1");
      assert.equal(config.apiKey, STUB_KEY);
      assert.equal(config.task, task);
    }
  });

  it("优先级矩阵：任务级 provider/model/baseURL/key 覆盖全局；全局覆盖缺省", () => {
    const env = envFor({
      CLEW_MODEL_PROVIDER: "openai-compatible",
      CLEW_MODEL: "global-model",
      CLEW_MODEL_BASE_URL: "https://global.example.internal/v1",
      CLEW_MODEL_API_KEY: STUB_KEY,
      CLEW_LESSON_PROVIDER: "openai-compatible",
      CLEW_LESSON_MODEL: "task-model",
      CLEW_LESSON_BASE_URL: "https://task.example.internal/v1",
      CLEW_LESSON_API_KEY: STUB_KEY,
    });
    const lesson = resolveClewTaskModelFrom("lesson", env);
    assert.equal(lesson.model, "task-model");
    assert.equal(lesson.baseURL, "https://task.example.internal/v1");
    assert.equal(lesson.apiKey, STUB_KEY);
    // chat 无任务级覆盖 → 全局生效
    const chat = resolveClewTaskModelFrom("chat", env);
    assert.equal(chat.provider, "openai-compatible");
    assert.equal(chat.model, "global-model");
    assert.equal(chat.baseURL, "https://global.example.internal/v1");
    assert.equal(chat.apiKey, STUB_KEY);
  });

  it("legacy 变量继续生效：CLEW_EXTRACT_PROVIDER / CLEW_EXTRACT_MODEL 与 lesson-chat-note 的 EXTRACT 回落链", () => {
    const legacy = envFor({ CLEW_EXTRACT_MODEL: "extract-model" });
    assert.equal(resolveClewTaskModelFrom("extraction", legacy).model, "extract-model");
    assert.equal(resolveClewTaskModelFrom("lesson", legacy).model, "extract-model");
    assert.equal(resolveClewTaskModelFrom("chat", legacy).model, "extract-model");
    // toc 不回落到 EXTRACT 模型（既有行为）
    assert.equal(resolveClewTaskModelFrom("toc", legacy).model, "qwen3.7-plus");
    // 任务级 provider 覆盖全局：CLEW_EXTRACT_PROVIDER=dashscope 压过 CLEW_MODEL_PROVIDER
    const mixed = envFor({
      CLEW_EXTRACT_PROVIDER: "dashscope",
      CLEW_MODEL_PROVIDER: "openai-compatible",
      CLEW_NOTE_BASE_URL: "https://note.example.internal/v1",
      CLEW_MODEL_API_KEY: STUB_KEY,
    });
    assert.equal(resolveClewTaskModelFrom("extraction", mixed).provider, "dashscope");
    assert.equal(resolveClewTaskModelFrom("note", mixed).provider, "openai-compatible");
  });

  it("openai-compatible：baseURL 必填；loopback http 允许；外网 http 拒绝", () => {
    // 缺 baseURL → 明确报错
    assert.throws(
      () =>
        resolveClewTaskModelFrom("lesson", envFor({
          CLEW_LESSON_PROVIDER: "openai-compatible",
          CLEW_MODEL_API_KEY: STUB_KEY,
        })),
      ClewProviderConfigError,
    );
    // loopback（localhost / 127.0.0.1 / [::1]）允许 http，key 取 CLEW_MODEL_API_KEY
    for (const base of ["http://localhost:11434/v1", "http://127.0.0.1:9000", "http://[::1]:11434/v1"]) {
      const config = resolveClewTaskModelFrom("lesson", envFor({
        CLEW_LESSON_PROVIDER: "openai-compatible",
        CLEW_LESSON_BASE_URL: base,
        CLEW_MODEL_API_KEY: STUB_KEY,
      }));
      assert.equal(config.baseURL, base);
      assert.equal(config.apiKey, STUB_KEY);
    }
    // 外网 http → 报错；https 外网 → 通过
    assert.throws(
      () =>
        resolveClewTaskModelFrom("lesson", envFor({
          CLEW_LESSON_PROVIDER: "openai-compatible",
          CLEW_LESSON_BASE_URL: "http://api.example.internal/v1",
          CLEW_MODEL_API_KEY: STUB_KEY,
        })),
      /HTTPS/,
    );
    assert.doesNotThrow(() =>
      resolveClewTaskModelFrom("lesson", envFor({
        CLEW_LESSON_PROVIDER: "openai-compatible",
        CLEW_LESSON_BASE_URL: "https://api.example.internal/v1",
        CLEW_MODEL_API_KEY: STUB_KEY,
      })));
  });

  it("未实现 provider（deepseek/kimi/zhipu）明确报错且消息含 openai-compatible 指引；dashscope 非 aliyuncs 主机拒绝", () => {
    for (const provider of ["deepseek", "kimi", "zhipu"]) {
      try {
        resolveClewTaskModelFrom("lesson", envFor({
          CLEW_LESSON_PROVIDER: provider,
          CLEW_MODEL_API_KEY: STUB_KEY,
        }));
        assert.fail(`provider ${provider} 应当抛错`);
      } catch (error) {
        assert.ok(error instanceof ClewProviderConfigError);
        assert.match(error.message, /尚未实现/);
        assert.match(error.message, /openai-compatible/);
        assert.match(error.message, /api\.deepseek\.com/);
      }
    }
    assert.throws(
      () => resolveClewTaskModelFrom("lesson", envFor({ DASHSCOPE_BASE_URL: "https://example.com/v1" })),
      /aliyuncs\.com/,
    );
    // 全局 CLEW_MODEL_BASE_URL 同样受 dashscope 主机规则约束
    assert.throws(
      () => resolveClewTaskModelFrom("lesson", envFor({ CLEW_MODEL_BASE_URL: "https://example.com/v1" })),
      /aliyuncs\.com/,
    );
  });

  it("isClewTaskConfiguredFrom：key+model 齐备才算配置；任务级 key 生效；未实现 provider 视为未配置", () => {
    assert.equal(isClewTaskConfiguredFrom("lesson", {}), false);
    assert.equal(isClewTaskConfiguredFrom("lesson", BASE_ENV), true);
    assert.equal(isClewTaskConfiguredFrom("chat", { CLEW_CHAT_API_KEY: STUB_KEY }), true);
    assert.equal(
      isClewTaskConfiguredFrom("lesson", { CLEW_LESSON_PROVIDER: "openai-compatible" }),
      false,
    );
    assert.equal(
      isClewTaskConfiguredFrom("lesson", {
        CLEW_LESSON_PROVIDER: "deepseek",
        CLEW_MODEL_API_KEY: STUB_KEY,
      }),
      false,
    );
  });

  it("describeClewTaskModelFrom 恒为 {provider}:{model}（不抛错、不含密钥）", () => {
    assert.equal(describeClewTaskModelFrom("lesson", BASE_ENV), "dashscope:qwen3.7-plus");
    assert.equal(
      describeClewTaskModelFrom("lesson", envFor({
        CLEW_LESSON_MODEL: "m2",
        CLEW_MODEL_PROVIDER: "openai-compatible",
      })),
      "openai-compatible:m2",
    );
  });

  it("请求体构建：enable_thinking 仅 dashscope 注入；response_format 透传；stream/max_tokens 正确", () => {
    const messages = [{ role: "user" as const, content: "hi" }];
    const dashConfig = resolveClewTaskModelFrom("lesson", BASE_ENV);
    const dash = buildChatCompletionsBody({
      config: dashConfig,
      messages,
      stream: true,
      temperature: 0.3,
      maxOutputTokens: 100,
    });
    assert.equal(dash.enable_thinking, false);
    assert.equal(dash.stream, true);
    assert.equal(dash.temperature, 0.3);
    assert.equal(dash.max_tokens, 100);

    const ocConfig = resolveClewTaskModelFrom("lesson", envFor({
      CLEW_LESSON_PROVIDER: "openai-compatible",
      CLEW_LESSON_BASE_URL: "https://api.example.internal/v1",
      CLEW_MODEL_API_KEY: STUB_KEY,
    }));
    const oc = buildChatCompletionsBody({
      config: ocConfig,
      messages,
      stream: false,
      temperature: 0.1,
      maxOutputTokens: 50,
    });
    assert.equal("enable_thinking" in oc, false);
    assert.equal(oc.stream, false);

    const withFormat = buildChatCompletionsBody({
      config: ocConfig,
      messages,
      stream: false,
      temperature: 0.1,
      maxOutputTokens: 50,
      responseFormat: { type: "json_object" },
    });
    assert.deepEqual(withFormat.response_format, { type: "json_object" });
  });

  it("URL 组装：无路径 / /v1 / 多段前缀 / 尾斜杠 / 已含端点 → 都拼出 …/chat/completions", () => {
    const mkConfig = (baseURL: string) =>
      resolveClewTaskModelFrom("lesson", envFor({
        CLEW_LESSON_PROVIDER: "openai-compatible",
        CLEW_LESSON_BASE_URL: baseURL,
        CLEW_MODEL_API_KEY: STUB_KEY,
      }));
    assert.equal(
      resolveChatCompletionsUrl(mkConfig("https://api.deepseek.com")),
      "https://api.deepseek.com/chat/completions",
    );
    assert.equal(
      resolveChatCompletionsUrl(mkConfig("https://api.moonshot.cn/v1")),
      "https://api.moonshot.cn/v1/chat/completions",
    );
    assert.equal(
      resolveChatCompletionsUrl(mkConfig("https://open.bigmodel.cn/api/paas/v4")),
      "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    );
    assert.equal(
      resolveChatCompletionsUrl(mkConfig("http://localhost:11434/v1/")),
      "http://localhost:11434/v1/chat/completions",
    );
    assert.equal(
      resolveChatCompletionsUrl(mkConfig("https://api.example.internal/v1/chat/completions")),
      "https://api.example.internal/v1/chat/completions",
    );
    // dashscope 缺省 → compatible-mode/v1/chat/completions
    assert.equal(
      resolveChatCompletionsUrl(resolveClewTaskModelFrom("lesson", BASE_ENV)),
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    );
  });
});
