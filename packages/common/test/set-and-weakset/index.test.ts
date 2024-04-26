import { describe, it, expect } from "vitest";

describe("WeakSet", () => {
  it("should add and check values", () => {
    const weakSet = new WeakSet();
    const obj1 = {};
    const obj2 = {};

    weakSet.add(obj1);
    weakSet.add(obj2);

    expect(weakSet.has(obj1)).toBe(true);
    expect(weakSet.has(obj2)).toBe(true);
    expect(weakSet.has({})).toBe(false);
  });

  it("should delete values", () => {
    const weakSet = new WeakSet();
    const obj1 = {};
    const obj2 = {};

    weakSet.add(obj1);
    weakSet.add(obj2);

    weakSet.delete(obj1);

    expect(weakSet.has(obj1)).toBe(false);
    expect(weakSet.has(obj2)).toBe(true);
  });
});
