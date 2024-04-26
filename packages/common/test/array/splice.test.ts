import { describe, it, expect } from "vitest";

describe("Array.splice", () => {
  it("cut prev elements return suffix elements", () => {
    const array = [1, 2, 3, 4, 5];
    const arr2 = array.splice(1);
    expect(arr2).toEqual([2, 3, 4, 5]);
  });

  it("splice from startIndex and deleteCount", () => {
    const array = [1, 2, 3, 4, 5];
    const arr2 = array.splice(1, 2);
    expect(arr2).toEqual([2, 3]);
  });

  it("splice with added elements", () => {
    const array = [1, 2, 3, 4, 5];
    // if necessary, inserts new elements in their place, returning the deleted elements.
    const arr2 = array.splice(1, 2, 9, 8, 7);
    expect(arr2).toEqual([2, 3]);
  });

  it("splice will change the origin array", () => {
    const array = [1, 2, 3, 4, 5];
    array.splice(1, 2, 9, 8, 7);
    expect(array).toEqual([1, 9, 8, 7, 4, 5]);
  });
});
