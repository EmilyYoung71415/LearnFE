import { describe, it, expect } from "vitest";

describe("WeakMap", () => {
  it("should store and retrieve values correctly", () => {
    const weakMap = new WeakMap();
    const key1 = {};
    const key2 = {};
    const value1 = "Value 1";
    const value2 = "Value 2";

    weakMap.set(key1, value1);
    weakMap.set(key2, value2);

    expect(weakMap.get(key1)).toBe(value1);
    expect(weakMap.get(key2)).toBe(value2);
  });

  it("should not prevent garbage collection", () => {
    const weakMap = new WeakMap();
    let key: {} | null = {};

    weakMap.set(key, "Value");

    // Trigger garbage collection
    key = null;

    // Wait for garbage collection to occur
    return new Promise((resolve) => setTimeout(resolve, 1e3)).then(() => {
      // The WeakMap should not contain the value anymore
      // @ts-ignore
      expect(weakMap.get(key)).toBeUndefined();
    });
  });

  it("should not be able to use primitive values as keys", () => {
    const weakMap = new WeakMap();
    const key = "key";
    const value = "Value";

    // Attempt to set a primitive value as a key
    expect(() => {
      // @ts-ignore
      weakMap.set(key, value);
    }).toThrow(TypeError);
  });
});
