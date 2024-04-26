import { describe, it, expect } from "vitest";

describe.skip("createObjectURL", () => {
  it("should generate a valid object URL", () => {
    const data = "Hello, World!";
    // TODO: fake Blob in Node.js environment
    const url = URL.createObjectURL(new Blob([data], { type: "text/plain" }));
    expect(url).toMatch(/^blob:/);
  });

  it("should revoke the object URL", () => {
    const data = "Hello, World!";
    const url = URL.createObjectURL(new Blob([data], { type: "text/plain" }));
    URL.revokeObjectURL(url);
    expect(() => {
      URL.revokeObjectURL(url);
    }).toThrowError();
  });
});
