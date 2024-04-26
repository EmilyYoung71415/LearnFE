import { describe, it, expect } from "vitest";

// flat(map)
describe("Array flatMap", () => {
  it("collect features in all", () => {
    const userInterests = [
      { name: "User1", interests: ["Feature A", "Feature B"] },
      { name: "User2", interests: ["Feature A"] },
    ];
    const features = userInterests.flatMap((user) => user.interests);
    expect(features).toEqual(["Feature A", "Feature B", "Feature A"]);
    const mapped = userInterests.map((user) => user.interests);
    expect(mapped).toEqual([["Feature A", "Feature B"], ["Feature A"]]);
  });

  it("parse parameters of string", () => {
    const queryString = "?name=John&age=30&city=NewYork";
    const paramsWithFlatMap = queryString
      .slice(1)
      .split("&")
      .flatMap((param) => param.split("="));
    expect(paramsWithFlatMap).toEqual([
      "name",
      "John",
      "age",
      "30",
      "city",
      "NewYork",
    ]);

    const paramsWithMap = queryString
      .slice(1)
      .split("&")
      .map((param) => param.split("="));
    expect(paramsWithMap).toEqual([
      ["name", "John"],
      ["age", "30"],
      ["city", "NewYork"],
    ]);
  });

  it("nested array: matrix to flat array", () => {
    const serverData = [
      [
        { id: 1, name: "John" },
        { id: 2, name: "Smith" },
      ],
      [
        { id: 3, name: "Sara" },
        { id: 4, name: "Heath" },
      ],
    ];

    const flattenedData = serverData.flatMap((data) => data);
    expect(flattenedData).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Smith" },
      { id: 3, name: "Sara" },
      { id: 4, name: "Heath" },
    ]);
  });

  // null / undefined
  it("nullish in an array", () => {
    let array = ["a", undefined, "b", null, "c"];
    let cleanArray = array.flatMap((item) => (item ? [item] : []));
    expect(cleanArray).toEqual(["a", "b", "c"]);
  });
});
