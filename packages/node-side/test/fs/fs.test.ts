import { describe, it, expect } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";

describe("fs.readFile", () => {
  it("should read the contents of a file", async () => {
    const pathUrl = path.join(__dirname, "./assets/append.txt");
    const data = await fs.readFile(pathUrl, "utf-8");
    expect(data).toBeDefined();
  });

  it("should throw an error if the file does not exist", async () => {
    const pathUrl = path.join(__dirname, "./assets/nonexistent.txt");
    await expect(fs.readFile(pathUrl, "utf-8")).rejects.toThrow();
  });

  it("should write 'hello world' to the append file", async () => {
    const pathUrl = path.join(__dirname, "./assets/append.txt");
    const content = "hello world";
    await fs.writeFile(pathUrl, content, "utf-8");
    const data = await fs.readFile(pathUrl, "utf-8");
    expect(data).toBe(content);
  });
});
