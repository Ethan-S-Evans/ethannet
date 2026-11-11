import type { HelloResponse, UiMessages } from "@ethannet/types";

/** Props for {@link HelloCard}: the api response plus the card's own copy. */
export interface HelloCardProps extends HelloResponse {
  /** The heading and the label shown before the timestamp. */
  messages: UiMessages["HelloCard"];
}

export function HelloCard({ message, timestamp, messages }: HelloCardProps) {
  return (
    <section style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>{messages.heading}</h1>
      <p>{message}</p>
      <p>
        <small>
          {messages.receivedAtLabel} {timestamp}
        </small>
      </p>
    </section>
  );
}
