# UI messages

All ui copy, meaning visible text and accessible names such as `aria-label`, comes from one JSON file. Components render it, and unit tests, stories and Playwright specs read the same values. Because of that, changing a label can't put the tests and the components out of sync. The format is modeled on [next-intl](https://next-intl.dev/) message files, so the ui can move to next-intl or a headless CMS like Strapi later without changing components. The plan this was built from is [2026-11-06-ui-messages](../plans/2026-11-06-ui-messages.md).

## Where things live

| File | What it holds |
| --- | --- |
| `packages/types/src/index.ts` | `UiMessages`, the contract every message source must satisfy. |
| `packages/messages/messages/en.json` | The English copy. **Edit copy here.** |
| `packages/messages/src/index.ts` | Exports `messages: UiMessages` from `en.json`. The type annotation makes `tsc` fail if the JSON is missing a key or has the wrong shape. |

The JSON has one namespace per component (`Logo`, `Header`, `MobileMenu`, `Footer`, `HelloCard`), like next-intl:

```json
{
  "MobileMenu": {
    "openLabel": "Open menu",
    "closeLabel": "Close menu",
    "navLabel": "Mobile"
  }
}
```

`@ethannet/messages` is a source-only workspace package, like `@ethannet/types`, so it's listed in `transpilePackages` in `apps/ui/next.config.ts`. See [Architecture](../architecture.md).

## How components get their copy

Components never import `@ethannet/messages`. Each one takes only its own namespace as a `messages` prop, and the composition roots inject it: `app/layout.tsx` for the [site layout](site-layout.md), and each page for its own components.

```tsx
<Header links={navLinks} messages={messages} />
<Footer navLinks={navLinks} socialLinks={socialLinks} messages={messages.Footer} />
```

`Header` takes `Pick<UiMessages, "Header" | "Logo" | "MobileMenu">` and passes each part down to `Logo` and `MobileMenu`.

## Changing things

- **Change copy**: edit `en.json`. Nothing else needs to change, and the tests keep passing.
- **Add a string**: add the key to `UiMessages` (with a doc comment), add it to `en.json`, then use it from the component's `messages` prop. Typecheck fails until both exist.
- **Add a component's copy**: add a new namespace named after the component to `UiMessages` and `en.json`, and give the component a `messages: UiMessages["Name"]` prop.
- **Move to a CMS (e.g. Strapi)**: return a `UiMessages` from the CMS, and swap what `layout.tsx` and the pages pass in for the fetched value. The e2e suite imports the bundled JSON, so it would need to read from the same source.
- **Add a locale**: add e.g. `fr.json` with the same shape. Choosing a locale per request isn't built yet, and is where next-intl would come in.

## Testing

Tests import `messages` instead of hardcoding strings:

```ts
import { messages } from "@ethannet/messages";

page.getByRole("button", { name: messages.MobileMenu.openLabel });
```

- `pnpm --filter @ethannet/messages test` checks that the export matches `en.json` and that every value is a non-empty string.
- `pnpm typecheck` checks that `en.json` matches `UiMessages`.
- The ui unit tests and [layout e2e spec](../../apps/e2e/tests/layout.spec.ts) find elements by the same messages the components render.

To check that nothing is hardcoded, change some values in `en.json` (e.g. `"Open menu"` → `"Show navigation"`) and run `pnpm test` and `pnpm test:e2e`. Both should still pass. Revert the change afterwards.

## Edge cases and limits

- **Navigation link labels** ("Home", "About", …) and social labels are still in `apps/ui/src/config/navigation.ts`, and `layout.spec.ts` still has its own copy of them. They aren't in the messages yet.
- **No interpolation**: values are plain strings. `HelloCard` renders `receivedAtLabel` followed by the timestamp rather than using an ICU `{timestamp}` placeholder.
- **Extra keys** in `en.json` that `UiMessages` doesn't have don't fail typecheck. Remove unused keys by hand.
