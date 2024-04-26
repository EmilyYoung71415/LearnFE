import { describe, test, expect } from "vitest";
import path from "node:path";

describe("path", () => {
  test("路径解析", () => {
    const pathInfo = path.parse("/home/user/dir/file.txt");
    expect(pathInfo).toEqual({
      root: "/",
      dir: "/home/user/dir",
      base: "file.txt",
      ext: ".txt",
      name: "file",
    });
  });

  test("路径拼接", () => {
    const joinedPath = path.join("/foo", "bar", "baz/asd", "quux", "..");
    expect(joinedPath).toBe("/foo/bar/baz/asd");
  });

  test("路径 normalize", () => {
    expect(path.normalize("/foo/bar///baz/asd/quux/..")).toBe(
      "/foo/bar/baz/asd"
    );
  });
});
