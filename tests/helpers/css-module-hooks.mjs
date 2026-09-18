/**
 * CSS Modules 加载钩子：供 node:test（tsx）环境渲染 v2 UI 组件使用。
 * 把 *.module.css 解析为 tests/helpers/css-module-stub.mjs（默认导出为类名代理），
 * 使组件冒烟测试无需打包器即可运行。
 */
import { pathToFileURL } from "node:url";
import { resolve as resolvePath } from "node:path";

const STUB_URL = pathToFileURL(resolvePath(import.meta.dirname, "./css-module-stub.mjs")).href;

export async function resolve(specifier, context, next) {
  if (specifier.endsWith(".module.css")) {
    return {
      shortCircuit: true,
      url: STUB_URL,
    };
  }
  return next(specifier, context);
}
