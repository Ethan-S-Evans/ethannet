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
  Navigation: {
    /** Text of the link to `/`. */
    home: string;
    /** Text of the link to `/about`. */
    about: string;
    /** Text of the link to `/projects`. */
    projects: string;
    /** Text of the link to `/contact`. */
    contact: string;
  };
  Social: {
    /** Text of the GitHub profile link. */
    github: string;
    /** Text of the LinkedIn profile link. */
    linkedin: string;
    /** Text of the email link. */
    email: string;
  };
  HelloCard: {
    /** The card's `<h1>`. */
    heading: string;
    /** Text shown before the response timestamp. */
    receivedAtLabel: string;
  };
}

/** Key of a site nav link's label in {@link UiMessages}`["Navigation"]`. */
export type NavLinkId = keyof UiMessages["Navigation"];

/** Key of a social link's label in {@link UiMessages}`["Social"]`. */
export type SocialLinkId = keyof UiMessages["Social"];

/**
 * A link as configured in code: where it goes, and which message key holds its
 * label. The label itself is copy, so it lives in the messages, not here.
 */
export interface LinkConfig<Id extends string> {
  /** Key of the link's label in the matching messages namespace. */
  id: Id;
  /** App route (`/about`) or absolute URL (`https://…`, `mailto:…`). */
  href: string;
}

/** An internal site link rendered with `next/link`, with its label resolved. */
export interface NavLink {
  /** Visible link text. */
  label: string;
  /** App route, e.g. `/about`. */
  href: string;
}

/** An external profile or contact link, opened in a new tab, with its label resolved. */
export interface SocialLink {
  /** Visible link text, e.g. `GitHub`. */
  label: string;
  /** Absolute URL (`https://…` or `mailto:…`). */
  href: string;
}
