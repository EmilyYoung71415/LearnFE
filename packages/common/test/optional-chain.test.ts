import { describe, it, expect } from "vitest";

describe("可选链操作符", () => {
  it("Object", () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    };
    expect(a.b?.c?.d).toBe(1);
    // @ts-ignore
    a.b = undefined;
    expect(a.b?.c?.d).toBe(undefined);
  });

  it("Array", () => {
    let arr: number[] | undefined = [1];
    expect(arr?.[0]).toBe(1);
    arr = undefined;
    expect(arr?.[0]).toBe(undefined);
  });

  it("Function", () => {
    let fn: Function | undefined = () => 1;
    expect(fn?.()).toBe(1);
    fn = undefined;
    // @ts-ignore
    expect(fn?.()).toBe(undefined);
  });
});
