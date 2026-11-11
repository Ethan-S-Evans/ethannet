import type { LinkConfig, NavLinkId, SocialLinkId } from "@ethannet/types";

export { resolveLinks } from "./resolveLinks";

/**
 * Site-wide navigation routes, shared by the header, the mobile menu, the footer
 * and the e2e suite. Labels live in `UiMessages["Navigation"]`; resolve them with
 * {@link resolveLinks} at the composition root (`app/layout.tsx`).
 *
 * `/about`, `/projects` and `/contact` are placeholders and 404 until those pages exist.
 */
export const navLinks: readonly LinkConfig<NavLinkId>[] = [
  { id: "home", href: "/" },
  { id: "about", href: "/about" },
  { id: "projects", href: "/projects" },
  { id: "contact", href: "/contact" },
];

/**
 * Footer social links. Labels live in `UiMessages["Social"]`.
 * The URLs are placeholders; replace them with real profiles.
 */
export const socialLinks: readonly LinkConfig<SocialLinkId>[] = [
  { id: "github", href: "https://github.com/" },
  { id: "linkedin", href: "https://www.linkedin.com/" },
  { id: "email", href: "mailto:hello@example.com" },
];
