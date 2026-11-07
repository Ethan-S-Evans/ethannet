> _Authored by Claude (Claude Code) on 2026-11-06, at the request of Ethan Evans, as the requirements for internationalization (i18n) in the ui. The implementation plan that follows from these stories will live alongside this file in [plans](./)._

# User stories: internationalization in the ui

## Goal

Anyone should be able to use the site in their own language, whatever their language and whatever assistive technology they use. Building this in now, before there are many components, avoids having to find and replace hard-coded English later. That includes `aria-label`s, which is where the problem first showed up (the header and mobile menu on `feature/site-header-footer`).

## Scope

**In scope**
- The `apps/ui` Next.js app: visible text, accessible names, page metadata, and date and number formatting.
- A shared definition of supported language codes in `packages/types`, so the api can use the same codes later.

**Out of scope for now**
- Translating api responses. The api stays as it is. If it ever returns user-facing text, it will use the shared language codes from `packages/types`.
- Language in the URL (`/en/...`, `/it/...`). The active language is application state, not part of the path.
- Translating content people create, machine translation, and a translation-management service.
- Separate URLs per language for search engines. This follows from the line above. See [Open questions](#open-questions).

## Priority key

- **Must**: required for this feature to be done.
- **Should**: expected, but could move to a follow-up if it adds a lot of work.
- **Could**: nice to have, and done only if it's cheap.

## Personas

- **Visitor**: anyone viewing the site, in any language.
- **Assistive-tech user**: a visitor using a screen reader, voice control, or keyboard-only navigation.
- **Developer**: whoever adds components, strings, or languages to the ui (Ethan, or an agent).

---

## Visitor stories

### US-1: First visit in my language (Must)
As a visitor, I want the site to open in my browser's preferred language when it's supported, so that I can read it without doing anything.

- If I haven't chosen a language yet, the site uses the best match from my browser's `Accept-Language` list.
- If none of my languages are supported, the site falls back to the default language (English).
- A regional variant matches its base language. For example, `it-CH` gets Italian.

### US-2: Switch language from any page (Must)
As a visitor, I want a language switcher on every page, so that I can change the language whenever I like.

- The switcher is in the site chrome (header, mobile menu, or footer), so it's on every page.
- Changing the language updates all text on the current page. The URL stays the same, and I stay on the same page.
- The URL never contains a language code.

### US-3: My choice is remembered (Must)
As a visitor, I want the site to remember the language I picked, so that I don't have to choose it again.

- A language I pick explicitly is used for later visits in the same browser, and it takes priority over my browser's language.
- This works without an account or login.

### US-4: I can find my language even if I can't read the current one (Must)
As a visitor who doesn't read the current language, I want to recognize my language in the switcher, so that I can still get to it.

- Each language is listed by its own name (endonym), such as "English", "Italiano", "Español". It is not translated into the current language.
- The switcher can be recognized without reading any text. For example, it has a language or globe icon next to it. National flags are not used, because a flag stands for a country, not a language.

### US-5: No flash of the wrong language (Must)
As a visitor, I want each page to arrive already in my language, so that it doesn't show English first and then switch.

- The server renders the page in the active language. Translation doesn't wait for client-side JavaScript.
- Pages still render in the right language with JavaScript turned off. Only the switcher needs JavaScript.

### US-6: Dates and numbers look right for my language (Should)
As a visitor, I want dates, times, and numbers formatted the way my language writes them, so that they read naturally.

- Dates, times, and numbers shown in the ui (for example, HelloCard's "Received at" timestamp) are formatted for the active language.
- Shared helpers do the formatting, so components don't call `toLocaleString` with ad-hoc options.

---

## Accessibility stories

### US-7: Screen readers use the right language (Must)
As an assistive-tech user, I want the page to declare its language, so that my screen reader pronounces it correctly.

- `<html lang>` always matches the active language, including right after I switch.
- `<html dir>` is set from the language (`ltr` or `rtl`), so a right-to-left language can be added later without changing the layout code.
- Anything displayed in a different language from the page carries its own `lang` attribute. For example, each endonym in the switcher does.

### US-8: Every accessible name is translated (Must)
As an assistive-tech user, I want every accessible name and description in my language, so that I get the same information as sighted users.

- No component hard-codes user-facing text. This covers visible text and `aria-label`, `aria-description`, `alt`, `title`, `placeholder`, and visually hidden text.
- This applies to the existing ui (HelloCard, layout metadata), and to the header, footer, and mobile menu once that branch merges.

### US-9: The language switcher itself is accessible (Must)
As an assistive-tech user, I want the switcher to work with my keyboard and screen reader, so that changing language doesn't depend on a mouse or on sight.

- It's a native control, or one that follows the matching ARIA pattern.
- It's fully usable by keyboard and shows a visible focus indicator.
- It has an accessible name in the current language (for example, "Language"), and it shows which language is currently active.
- After a switch, focus doesn't jump to the top of the page, and the new language is announced (or is clear from the updated `lang`).
- It meets WCAG 2.2 AA for contrast and target size.

### US-10: Page titles and metadata are translated (Must)
As a visitor or assistive-tech user, I want the browser tab title and page description in my language, because the title is the first thing a screen reader announces.

- `<title>` and `<meta name="description">` come from the translation files.

### US-11: Layout survives other languages (Should)
As a visitor, I want the layout to hold up in any language, so that longer words or right-to-left text don't break it.

- New and changed CSS uses logical properties (`margin-inline-start`, `inset-inline-end`, and so on) instead of `left` and `right`, so a future RTL language mirrors correctly.
- Components handle text about 40% longer than English without overflowing or clipping. This is a common rule of thumb for German and Finnish.

---

## Developer stories

### US-12: Strings live in per-language message files (Must)
As a developer, I want all ui text in one message file per language, organized by namespaced keys, so that translations are kept in one place and not scattered through components.

- There is one JSON file per language, such as `messages/en.json` and `messages/it.json`.
- Keys are grouped by feature or component and accessed by path, such as `t("menu.open")`.
- Messages can include variables, plurals, and rich text. For example, "Received at {time}" and "{count, plural, one {# file} other {# files}}".

### US-13: Typos in keys fail the typecheck (Must)
As a developer, I want `pnpm typecheck` to catch a misspelled or missing message key, so that broken strings never reach the browser.

- English is the source of truth. Its keys define the allowed set.
- Using a key that doesn't exist in English is a TypeScript error.
- Passing the wrong or missing variables for a message is a TypeScript error, wherever the library supports checking it.

### US-14: Missing translations fall back gracefully (Must)
As a visitor, I want text that isn't translated yet to show in English, so that I never see a raw key like `menu.open` or a blank space.

- A key missing from a non-default language falls back to the English message.
- In development, the fallback logs a warning that names the language and the key.

### US-15: Tests catch incomplete translations (Must)
As a developer, I want `pnpm test` to report when language files don't match, so that every language stays complete.

- A Vitest test checks that every language file has exactly the same keys as English, with nothing missing and nothing extra.
- It also checks that each message uses the same variables as its English version.

### US-16: Adding a language is a small, contained change (Must)
As a developer, I want adding a language to mean adding one message file and registering its code in one place, so that it's quick and hard to get wrong.

- The supported-languages list is defined once. The switcher, detection, validation, and tests all read it.
- The steps are documented in `docs/`.

### US-17: Language codes are a shared contract (Must)
As a developer, I want supported language codes defined in `packages/types`, so that the ui and a future api agree on them.

- The codes are BCP 47 tags (`en`, `it`, ...), exported as a type (and, if needed, a list), with doc comments.
- `packages/types` holds only the codes and their types. Translations and ui-only logic stay in `apps/ui`.

### US-18: Components can be rendered in any language in tests and Storybook (Must)
As a developer, I want to render a component in any language in Vitest and in Storybook, so that I can check translations and layout without running the app.

- Tests have a helper that renders a component with a chosen language's messages.
- Storybook has a toolbar control for switching language across every story.
- Components get translated text the same way in the app, in tests, and in stories (dependency inversion). There's no global state that only works in one of them.

### US-19: The language decision is testable end to end (Must)
As a developer, I want Playwright coverage for the language flow, so that regressions are caught.

- The specs cover: detection from `Accept-Language`, the fallback for an unsupported language, switching languages with the switcher, persistence across a reload, `<html lang>` updating, and the URL staying the same.
- An automated accessibility check (for example, axe) runs on the page in each supported language.

### US-20: Hard-coded strings are easy to spot (Could)
As a developer, I want hard-coded text to stand out during development, so that I catch it before review.

- A development-only pseudo-locale can do this. It shows every translated string accented or padded (for example, `[Ôþéñ ɱéñú]`), so any plain English left on the page must be hard-coded. It also tests layout with longer text (see US-11).
- Alternatively, a lint check flags string literals in JSX text and `aria-*` attributes.

---

## Non-functional requirements

- **Performance**: a page loads only the messages for the active language, and server components don't send messages to the client unless a client component needs them.
- **Dependencies**: any library used must have an allowed license (see CLAUDE.md), and the license must be checked before it's added.
- **Documentation**: there is a feature doc in `docs/features/` covering how it works, how to add a string, how to add a language, and how to test. Storybook documents the switcher.

## Open questions

1. **Initial languages**: English is the default. Which second language should ship with this, to show that switching works end to end? Italian (`it`) is assumed for now because you used it as an example. The dev-only pseudo-locale (US-20) would be in addition to it.
2. **Search engines**: with no language in the URL, search engines will index only the default language. That's fine for a personal site now, but it rules out per-language search results unless URLs are added later. Is that acceptable?
3. **Ordering with `feature/site-header-footer`**: that branch has the hard-coded `aria-label`s and is a natural place for the switcher. Should it merge into `dev` first, so this branch can rebase and translate it? Or should this branch go first, with the header branch rebasing on top?
4. **Where the switcher goes**: the header (desktop) plus the mobile menu, the footer, or both?
