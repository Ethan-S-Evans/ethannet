import type { UiMessages } from "@ethannet/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelloCard } from "./HelloCard";

const messages: UiMessages["HelloCard"] = {
  heading: "Test heading",
  receivedAtLabel: "Test received:",
};

const timestamp = "2026-01-01T00:00:00.000Z";

describe("HelloCard", () => {
  it("renders the message", () => {
    render(
      <HelloCard
        message="Hi there"
        timestamp={timestamp}
        messages={messages}
      />,
    );
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("renders its heading and timestamp label from messages", () => {
    render(
      <HelloCard
        message="Hi there"
        timestamp={timestamp}
        messages={messages}
      />,
    );
    expect(
      screen.getByRole("heading", { name: messages.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${messages.receivedAtLabel} ${timestamp}`),
    ).toBeInTheDocument();
  });
});
