import { messages } from "@ethannet/messages";
import { describe, expect, it } from "vitest";
import { navLinks, socialLinks } from "./index";

describe("navLinks", () => {
  it("has unique ids and hrefs", () => {
    expect(new Set(navLinks.map((l) => l.id)).size).toBe(navLinks.length);
    expect(new Set(navLinks.map((l) => l.href)).size).toBe(navLinks.length);
  });

  it("uses app routes", () => {
    for (const { href } of navLinks) expect(href).toMatch(/^\//);
  });

  it("covers every Navigation message", () => {
    expect(navLinks.map((l) => l.id).sort()).toEqual(
      Object.keys(messages.Navigation).sort(),
    );
  });
});

describe("socialLinks", () => {
  it("has unique ids", () => {
    expect(new Set(socialLinks.map((l) => l.id)).size).toBe(socialLinks.length);
  });

  it("uses absolute URLs", () => {
    for (const { href } of socialLinks)
      expect(href).toMatch(/^(https:\/\/|mailto:)/);
  });

  it("covers every Social message", () => {
    expect(socialLinks.map((l) => l.id).sort()).toEqual(
      Object.keys(messages.Social).sort(),
    );
  });
});
