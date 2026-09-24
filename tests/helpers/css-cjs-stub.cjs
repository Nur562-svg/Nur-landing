/**
 * CJS-side CSS stub for node:test (tsx). The in-file module.register() hook
 * only covers the ESM resolution lane; tsx transforms TS/TSX to CJS and
 * resolves `import "./x.module.css"` through require() in Node ≥ 22
 * (require(esm) era), which never consults the ESM hook. Registered via
 * NODE_OPTIONS --require so the patch is in place before any test file loads.
 */
const Module = require("node:module");

if (!Module._extensions[".css"]) {
  // Mirror tests/helpers/css-module-stub.mjs: named properties AND an
  // `esModule` marker, so both `import styles from` (default interop reads
  // .default when __esModule is set) and `require()` shapes expose class names.
  Module._extensions[".css"] = function compileCssStub(mod, filename) {
    mod._compile(
      "const proxy = new Proxy({}, { get: (_, key) => (typeof key === 'string' ? key : '') });" +
        "proxy.__esModule = true; proxy.default = proxy;" +
        "module.exports = proxy;",
      filename,
    );
  };
}
