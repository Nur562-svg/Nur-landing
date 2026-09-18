/**
 * CSS Modules stub：把模块解析为「属性名即类名」的默认导出代理，
 * 供 node:test（tsx）环境的组件冒烟测试使用（见 tests/helpers/css-module-hooks.mjs）。
 */
export default new Proxy(
  {},
  {
    get: (_target, prop) => (typeof prop === "string" ? prop : ""),
  },
);
