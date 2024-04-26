// 使用map代替Array
import { describe, it, expect } from "vitest";

describe("Map", () => {
  it("replace Array with Map", () => {
    type User = {
      name: string;
      age: number;
    };
    const userArr: User[] = [
      {
        name: "a",
        age: 1,
      },
      {
        name: "b",
        age: 2,
      },
    ];
    const map = new Map(userArr.map((user) => [user.name, user]));
    expect(map.get("a")).toBe(userArr[0]);
  });

  describe("clear", () => {
    it("clear Map", () => {
      const map = new Map();
      map.set("a", 1);
      map.clear();
      expect(map.get("a")).toBe(undefined);
    });
    it("clear Array", () => {
      const arr = [1, 2, 3];
      arr.length = 0;
      expect(arr[0]).toBe(undefined);
    });
  });
});
