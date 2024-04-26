import { describe, it, expect } from "vitest";

describe("Array flat", () => {
  it("should flatten a nested array", () => {
    const input = [1, [2, [3, [4, 5]]]];
    const output = input.flat();
    // 默认只flat一层
    expect(output).toEqual([1, 2, [3, [4, 5]]]);
  });

  it("should flatten a nested array up to the specified depth 1", () => {
    const nestedArray = [1, [2, [3, [4, 5]]]];
    expect(nestedArray.flat(1)).toEqual([1, 2, [3, [4, 5]]]);
  });

  it("should flatten a nested array up to the specified depth 2", () => {
    const nestedArray2 = [1, [2, [3, [4, 5]]]];
    expect(nestedArray2.flat(2)).toEqual([1, 2, 3, [4, 5]]);
  });

  it("should not modify the original array", () => {
    const nestedArray = [1, [2, [3, [4, 5]]]];
    nestedArray.flat();
    expect(nestedArray).toEqual([1, [2, [3, [4, 5]]]]);
  });

  it("should flatten a nested array completely", () => {
    const nestedArray = [1, [2, [3, [4, 5]]]];
    const output = nestedArray.flat(Infinity);
    expect(output).toEqual([1, 2, 3, 4, 5]);
  });
});
