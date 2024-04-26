import { describe, it, expect } from "vitest";

describe("slice", () => {
  it("should return a new array with elements from the start index to the end index", () => {
    const array = [1, 2, 3, 4, 5];
    // get a new array between 1 and 4
    const result = array.slice(1, 4);
    expect(result).toEqual([2, 3, 4]);
  });

  it("should return a new array with elements from the start index to the end of the array if end index is not provided", () => {
    const array = [1, 2, 3, 4, 5];
    // cut prev 2 elements, and return the rest
    const result = array.slice(2);
    expect(result).toEqual([3, 4, 5]);
  });

  it("should return an empty array if start index is greater than or equal to the array length", () => {
    const array = [1, 2, 3, 4, 5];
    const result = array.slice(5);
    expect(result).toEqual([]);
  });

  it("should return a new array with all elements if no start and end index are provided", () => {
    const array = [1, 2, 3, 4, 5];
    const result = array.slice();
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
