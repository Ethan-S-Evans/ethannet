import { describe, expect, it } from "vitest";
import en from "../messages/en.json";
import { messages } from "./index";

/** Every leaf of a message tree as `[dotted.path, value]` pairs. */
function leaves(tree: object, prefix = ""): [string, unknown][] {
  return Object.entries(tree).flatMap(([key, value]) =>
    value !== null && typeof value === "object"
      ? leaves(value, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value] as [string, unknown]],
  );
}

describe("messages", () => {
  it("exports the English messages", () => {
    expect(messages).toEqual(en);
  });

  it("has a non-empty string at every leaf", () => {
    for (const [path, value] of leaves(messages)) {
      expect(typeof value, path).toBe("string");
      expect((value as string).trim(), path).not.toBe("");
    }
  });
});
