import { messages } from "@ethannet/messages";
import type { NavLink, SocialLink } from "@ethannet/types";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/example" },
];

describe("Footer", () => {
  it("renders the nav links in a footer navigation landmark", () => {
    render(
      <Footer
        navLinks={navLinks}
        socialLinks={socialLinks}
        messages={messages.Footer}
      />,
    );
    const nav = screen.getByRole("navigation", {
      name: messages.Footer.navLabel,
    });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(nav).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("opens social links in a new tab safely", () => {
    render(
      <Footer
        navLinks={navLinks}
        socialLinks={socialLinks}
        messages={messages.Footer}
      />,
    );
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/example");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("omits the social list when there are no social links", () => {
    render(
      <Footer
        navLinks={navLinks}
        socialLinks={[]}
        messages={messages.Footer}
      />,
    );
    expect(
      screen.queryByRole("list", { name: messages.Footer.socialLabel }),
    ).not.toBeInTheDocument();
  });

  it("has no copyright line", () => {
    render(
      <Footer
        navLinks={navLinks}
        socialLinks={socialLinks}
        messages={messages.Footer}
      />,
    );
    expect(screen.getByRole("contentinfo")).not.toHaveTextContent(
      /©|copyright/i,
    );
  });
});
