import { describe, it, expect } from "vitest";

describe("??, ??=", () => {
  it("??: 空值合并运算符", () => {
    // 空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
    const num = 0 ?? 1;
    const str = "" ?? "a";
    const b = undefined ?? "b";
    const a = null ?? "a";

    expect(a).toBe("a");
    expect(b).toBe("b");
    expect(num).toBe(0);
    expect(str).toBe("");
  });

  it("||", () => {
    const a = null || "a";
    const b = undefined || "b";
    const num = 0 || 1;
    const str = "" || "a";

    expect(a).toBe("a");
    expect(b).toBe("b");
    expect(num).toBe(1);
    expect(str).toBe("a");
  });

  it("&&", () => {
    const a = null && "a";
    const b = undefined && "b";
    const num = 0 && 1;
    const str = "" && "a";
    const str2 = "1" && "a";

    expect(a).toBe(null);
    expect(b).toBe(undefined);
    expect(num).toBe(0);
    expect(str).toBe("");
    expect(str2).toBe("a");
  });

  it("??=: 逻辑空赋值", () => {
    // 逻辑空赋值运算符 (x ??= y) 仅在 x 是 nullish (null 或 undefined) 时对其赋值。
    const obj: Record<string, any> = {
      a: null,
      b: undefined,
      num: 0,
      str: "",
    };

    obj.a ??= "a";
    obj.b ??= "b";
    obj.num ??= 1;
    obj.str ??= "a";
    expect(obj).toEqual({
      a: "a",
      b: "b",
      num: 0,
      str: "",
    });
  });
});
