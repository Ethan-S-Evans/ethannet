import type { NavLink } from "@/config/navigation";
import { messages } from "@ethannet/messages";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
];

describe("Header", () => {
  it("renders the logo linking home", () => {
    render(<Header links={links} messages={messages} />);
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: messages.Logo.homeLabel,
      }),
    ).toHaveAttribute("href", "/");
  });

  it("renders every link in the main navigation", () => {
    render(<Header links={links} messages={messages} />);
    const nav = screen.getByRole("navigation", {
      name: messages.Header.navLabel,
    });
    for (const link of links) {
      expect(
        within(nav).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }
  });

  it("includes the mobile menu toggle", () => {
    render(<Header links={links} messages={messages} />);
    expect(
      screen.getByRole("button", { name: messages.MobileMenu.openLabel }),
    ).toBeInTheDocument();
  });
});
