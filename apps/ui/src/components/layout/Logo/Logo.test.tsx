import type { UiMessages } from "@ethannet/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

const messages: UiMessages["Logo"] = {
  text: "test-logo",
  homeLabel: "Test home",
};

describe("Logo", () => {
  it("links to the home page with an accessible name", () => {
    render(<Logo messages={messages} />);
    const link = screen.getByRole("link", {
      name: messages.homeLabel,
    });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveTextContent(messages.text);
  });
});
