// Node loading of the engine: compile once, instantiate per heap.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Engine } from "./engine.mjs";
export * from "./engine.mjs";

let WASM_PATH = fileURLToPath(new URL("../engine/heappi.wasm", import.meta.url));
let compiled;
/** Point the host at an engine binary elsewhere (a bundled host has no package directory). */
export function setEnginePath(path) { WASM_PATH = path; compiled = undefined; }
export function enginePath() { return WASM_PATH; }
export function compileEngine() {
  compiled ??= readFile(WASM_PATH).then((b) => WebAssembly.compile(b));
  return compiled;
}
export class NodeEngine extends Engine {
  static async create() { return Engine.fromModule(await compileEngine()); }
}
