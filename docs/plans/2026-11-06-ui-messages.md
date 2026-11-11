> _Authored by Claude (Claude Code) on 2026-11-06, at the request of Ethan Evans, as the plan for moving ui copy into a single typed message file. The result is documented in [UI messages](../features/ui-messages.md)._

# Plan: Single source of truth for ui text

## Context

The layout e2e spec found the hamburger with `getByRole("button", { name: "Open menu" })`, and the component hardcoded the same `aria-label`. Changing the label in one place broke the other. The goal was to keep copy configurable, like a CMS such as Strapi, with a JSON file and a type modeled on next-intl's message files, so tests and components read the same values.

## Decisions

- **Contract** `UiMessages` goes in `packages/types`, where shared contracts live. A future CMS response has to match it.
- **Data** goes in a new source-only package, `packages/messages` (`@ethannet/messages`). It holds `messages/en.json`, and `src/index.ts` exports it typed as `UiMessages`. It's a package rather than ui code so `apps/e2e` can import it without reaching into another app.
- **Shape**: one namespace per component (`Logo`, `Header`, `MobileMenu`, `Footer`, `HelloCard`), like next-intl.
- **Injection**: each component takes a `messages` prop with only its own namespace. `layout.tsx` and `page.tsx` inject them. No React context or `useTranslations` hook yet, which keeps components server-safe and easy to test.
- **Scope**: every hardcoded string in the ui components. Nav and social link labels stay in `config/navigation.ts` for now.

## Steps

1. Add `UiMessages` to `packages/types`.
2. Create `packages/messages` with a failing Vitest test (the export equals `en.json`, and every value is a non-empty string), then add `en.json` and the export.
3. Add `@ethannet/messages` to the ui (dependency and `transpilePackages`) and to e2e.
4. Change the ui unit tests to use `messages`, then add a `messages` prop to `Logo`, `MobileMenu`, `Header`, `Footer` and `HelloCard`. Wire them up in `layout.tsx` and `page.tsx`.
5. Update stories to pass `messages` as args, and change `layout.spec.ts` to use `messages`.
6. Check for drift: change labels in `en.json` and confirm `pnpm test` and `pnpm test:e2e` still pass. Delete a key and confirm `pnpm typecheck` fails.
7. Docs ([UI messages](../features/ui-messages.md), [Site layout](../features/site-layout.md), [Architecture](../architecture.md), CLAUDE.md) and a minor changeset.

## As built

Built as planned. Running `pnpm lint:fix` also formatted `packages/types/src/index.ts` (semicolons, and `import type` for `MIMEType`). Biome's `node:util` protocol warning there was already present and is left as is.
