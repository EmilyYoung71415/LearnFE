import { describe, it, expect } from "vitest";

describe("this should work in arrow function", () => {
  it("this points to the parent scope in arrow function", () => {
    class Tree {
      name = "tree";
      traverseMethod() {
        // expect(this).toBe(globalThis);
        expect(this).toBeInstanceOf(Tree);
        expect(this.name).toBe("tree");
      }
      traverseArrowMethod = () => {
        // expect(this).toBe(globalThis);
        expect(this).toBeInstanceOf(Tree);
        expect(this.name).toBe("tree");
      };
    }
    const tree = new Tree();
    tree.traverseArrowMethod();
    tree.traverseMethod();
  });

  it("should access 'this' from the parent scope", () => {
    const obj = {
      value: "test",
      method: function () {
        // Define an arrow function inside a method
        const arrowFunc = () => {
          // This should refer to 'obj'
          expect(this.value).toBe("test");
        };
        arrowFunc();

        function notAnArrowFunction() {
          // expect(this).toBe(globalThis);
          expect(this?.value).toBeUndefined();
        }

        notAnArrowFunction();
      },
    };
    obj.method();
  });
});
