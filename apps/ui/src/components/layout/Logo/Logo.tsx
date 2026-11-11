import type { UiMessages } from "@ethannet/types";
import Link from "next/link";
import styles from "./Logo.module.css";

/** Props for {@link Logo}. */
export interface LogoProps {
  /** The wordmark text and the link's accessible name. */
  messages: UiMessages["Logo"];
}

/** The site wordmark, linking back to the home page. Swap the text for an image here. */
export function Logo({ messages }: LogoProps) {
  return (
    <Link className={styles.logo} href="/" aria-label={messages.homeLabel}>
      {messages.text}
    </Link>
  );
}
