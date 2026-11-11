import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { messages } from "@ethannet/messages";
import { navLinks, resolveLinks, socialLinks } from "@ethannet/navigation";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "ethannet",
  description: "Minimal pnpm + TypeScript + Express + Next.js monorepo",
};

// Composition root: the only place the link config and the shared messages are
// combined and wired into layout components.
const resolvedNavLinks = resolveLinks(navLinks, messages.Navigation);
const resolvedSocialLinks = resolveLinks(socialLinks, messages.Social);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header links={resolvedNavLinks} messages={messages} />
        <main>{children}</main>
        <Footer
          navLinks={resolvedNavLinks}
          socialLinks={resolvedSocialLinks}
          messages={messages.Footer}
        />
      </body>
    </html>
  );
}
