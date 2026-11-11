import type { MIMEType } from "util";

export interface HelloResponse {
  message: string;
  timestamp: string;
}

export interface MediaFileMetadata {
  id: string;
  name: string;
  size: number;
  creationTimestamp: Date;
  lastUpdatedTimestamp: Date;
  mimeType: MIMEType;
  location?: { latitude: number; longitude: number };
}

export interface MediaFile extends MediaFileMetadata {
  content: Blob;
}

/**
 * Every piece of ui copy (visible text and accessible names), grouped into one
 * namespace per component in the style of next-intl message files.
 *
 * This is the contract any message source must satisfy: today the bundled
 * `@ethannet/messages` JSON, later possibly a CMS such as Strapi. Components take
 * only their own namespace as a prop, and tests read the same values, so copy
 * can change without breaking either.
 */
export interface UiMessages {
  Logo: {
    /** The visible wordmark. */
    text: string;
    /** Accessible name of the logo link to `/`. */
    homeLabel: string;
  };
  Header: {
    /** Accessible name of the inline desktop `<nav>`. */
    navLabel: string;
  };
  MobileMenu: {
    /** Accessible name of the hamburger button. */
    openLabel: string;
    /** Accessible name of the X button inside the panel. */
    closeLabel: string;
    /** Accessible name of the slide-out panel's `<nav>`. */
    navLabel: string;
  };
  Footer: {
    /** Accessible name of the footer `<nav>`. */
    navLabel: string;
    /** Accessible name of the social links list. */
    socialLabel: string;
  };
  HelloCard: {
    /** The card's `<h1>`. */
    heading: string;
    /** Text shown before the response timestamp. */
    receivedAtLabel: string;
  };
}
