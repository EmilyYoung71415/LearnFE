// import.meta.url包含当前模块文件的URL。这通常用于解析模块文件的路径，获取模块文件的目录
import { describe, it, expect } from "vitest";

describe("import.meta.url", () => {
  it("should be defined", () => {
    expect(import.meta.url).toBeDefined();
  });

  it("should be a string starting with 'file://'", () => {
    expect(typeof import.meta.url).toBe("string");
    expect(import.meta.url.startsWith("file://")).toBe(true);
    // expect(import.meta.url).toBe(
    //   "file:///Users/xxx/LearnFE/packages/node-side/test/import-meta/index.test.ts"
    // );
  });
});
