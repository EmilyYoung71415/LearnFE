import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";

describe("import.meta.url with URL object", () => {
  it("should get the directory of the current module file", () => {
    const url = new URL(import.meta.url);
    const absoluteUrl = url.pathname;
    const path = fileURLToPath(url);
    expect(path).toBe(absoluteUrl);
  });
});
