import type { NavLink, UiMessages } from "@ethannet/types";
import { Logo } from "../Logo";
import { MobileMenu } from "../MobileMenu";
import { NavLinks } from "../NavLinks";
import styles from "./Header.module.css";

/** Props for {@link Header}. */
export interface HeaderProps {
  /** Main navigation links, shown inline on desktop and in the mobile menu on phones. */
  links: NavLink[];
  /** Copy for the header and the logo and mobile menu it contains. */
  messages: Pick<UiMessages, "Header" | "Logo" | "MobileMenu">;
}

/**
 * Site header: logo on the left, navigation on the right.
 * Mobile-first: below 768px the links live in the hamburger menu; at 768px and up
 * they're shown inline and the hamburger is hidden.
 */
export function Header({ links, messages }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Logo messages={messages.Logo} />
      <nav aria-label={messages.Header.navLabel} className={styles.desktopNav}>
        <NavLinks links={links} />
      </nav>
      <div className={styles.mobileMenu}>
        <MobileMenu links={links} messages={messages.MobileMenu} />
      </div>
    </header>
  );
}
