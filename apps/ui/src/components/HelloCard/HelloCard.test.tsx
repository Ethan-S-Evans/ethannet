import { messages } from "@ethannet/messages";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelloCard } from "./HelloCard";

const timestamp = "2026-01-01T00:00:00.000Z";

describe("HelloCard", () => {
  it("renders the message", () => {
    render(
      <HelloCard
        message="Hi there"
        timestamp={timestamp}
        messages={messages.HelloCard}
      />,
    );
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("renders its heading and timestamp label from messages", () => {
    render(
      <HelloCard
        message="Hi there"
        timestamp={timestamp}
        messages={messages.HelloCard}
      />,
    );
    expect(
      screen.getByRole("heading", { name: messages.HelloCard.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${messages.HelloCard.receivedAtLabel} ${timestamp}`),
    ).toBeInTheDocument();
  });
});
