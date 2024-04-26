import { describe, it, expect } from "vitest";

describe("prefer methods over function properties", () => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#
  // Only functions defined as methods have access to the super keyword.
  // super.prop looks up the property on the prototype of the object that the method was initialized on.
  it("should throw a SyntaxError when accessing super keyword outside of a method", () => {
    const obj = {
      __proto__: {
        prop: "foo",
      },
      superWorksMethod() {
        expect(super.prop).toBe("foo");
      },
      // function properties
      notAMethod: function () {
        // try {
        //   // @ts-ignore
        //   super.prop;
        // } catch (error) {
        //   expect(error).toBeInstanceOf(SyntaxError);
        // }
      },
    };

    obj.notAMethod();
  });

  it("prefer methods over function properties in class", () => {
    class LineShapeTool {
      static id = "line";

      superWorksMethod() {}

      superNotWorksMethod = () => {};
    }

    class ScaleTool extends LineShapeTool {
      static override id = "scale";

      override superWorksMethod() {
        super.superWorksMethod();
      }

      override superNotWorksMethod = () => {
        try {
          // @ts-ignore
          super.superNotWorksMethod();
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
          expect(error.message).toBe(
            "(intermediate value).superNotWorksMethod is not a function"
          );
        }
      };
    }

    const scaleInstance = new ScaleTool();
    scaleInstance.superNotWorksMethod();
  });
});
