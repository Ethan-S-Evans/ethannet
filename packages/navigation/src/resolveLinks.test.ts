import { describe, expect, it } from "vitest";
import { resolveLinks } from "./resolveLinks";

describe("resolveLinks", () => {
  it("replaces each id with its label and keeps the href", () => {
    const links = [
      { id: "a", href: "/a" },
      { id: "b", href: "https://example.com/" },
    ] as const;
    expect(resolveLinks(links, { a: "Alpha", b: "Beta" })).toEqual([
      { label: "Alpha", href: "/a" },
      { label: "Beta", href: "https://example.com/" },
    ]);
  });

  it("keeps the config order, not the label order", () => {
    const links = [
      { id: "b", href: "/b" },
      { id: "a", href: "/a" },
    ] as const;
    expect(
      resolveLinks(links, { a: "Alpha", b: "Beta" }).map((l) => l.label),
    ).toEqual(["Beta", "Alpha"]);
  });

  it("returns an empty list for no links", () => {
    expect(resolveLinks([], {})).toEqual([]);
  });
});
