import { describe, it, expect } from "vitest";

describe("Object.entries", () => {
  it("should return an array of key-value pairs", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const entries = Object.entries(obj);
    expect(entries).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  it("should include non-enumerable properties", () => {
    const obj = Object.create(
      {},
      {
        a: { value: 1, enumerable: true },
        b: { value: 2, enumerable: false },
      }
    );
    const entries = Object.entries(obj);
    expect(entries).toEqual([
      ["a", 1],
      // ["b", 2],
    ]);
  });

  it("should return an empty array for an empty object", () => {
    const obj = {};
    const entries = Object.entries(obj);
    expect(entries).toEqual([]);
  });
});
