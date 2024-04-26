import { describe, it, expect } from "vitest";

describe("this should work when is not inside an arrow function", () => {
  it("this points to obj in obj.method", () => {
    const obj = {
      name: "world",
      method() {
        expect(this.name).toBe(obj.name);
      },
    };
    obj.method();
  });

  it("this points to global when invoked as a free function invocation", () => {
    function test() {
      expect(this).toBe(globalThis);
    }
    test();
  });

  it("this meets new keyword", () => {
    function Test() {
      this.name = "test";
    }

    const instance = new Test();

    // Check if 'this' inside the function is a brand new object
    expect(instance).toBeDefined();
    expect(instance.name).toBe("test");
  });

  describe("call/apply/bind", () => {
    it("this points to the object passed as argument in call", () => {
      const parentScope = { name: "parent scope" };

      function func() {
        expect(this).toBe(parentScope);
      }

      // Call the function in the context of parentScope
      func.call(parentScope);
    });

    it("this points to the object passed as argument in apply", () => {
      const parentScope = { name: "parent scope" };

      function func() {
        expect(this).toBe(parentScope);
      }

      // Call the function in the context of parentScope
      func.apply(parentScope);
    });

    it("this points to the object passed as argument in bind", () => {
      const parentScope = { name: "parent scope" };

      function func() {
        expect(this).toBe(parentScope);
      }

      const boundFunc = func.bind(parentScope);
      boundFunc();
    });
  });
});
