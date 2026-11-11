import { messages } from "@ethannet/messages";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("links to the home page with an accessible name", () => {
    render(<Logo messages={messages.Logo} />);
    const link = screen.getByRole("link", {
      name: messages.Logo.homeLabel,
    });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveTextContent(messages.Logo.text);
  });
});
