# UI messages

All ui copy, meaning visible text and accessible names such as `aria-label`, comes from one JSON file. Components render it and stories show it. Tests deliberately don't read it (see [Testing](#testing)). The format is modeled on [next-intl](https://next-intl.dev/) message files, so the ui can move to next-intl or a headless CMS like Strapi later without changing components. The plan this was built from is [2026-11-06-ui-messages](../plans/2026-11-06-ui-messages.md).

## Where things live

| File | What it holds |
| --- | --- |
| `packages/types/src/index.ts` | `UiMessages`, the contract every message source must satisfy. |
| `packages/messages/messages/en.json` | The English copy. **Edit copy here.** |
| `packages/messages/src/index.ts` | Exports `messages: UiMessages` from `en.json`. The type annotation makes `tsc` fail if the JSON is missing a key or has the wrong shape. |

The JSON has one namespace per component (`Logo`, `Header`, `MobileMenu`, `Footer`, `HelloCard`), like next-intl, plus `Navigation` and `Social` for the labels of the site links:

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
<Header links={resolvedNavLinks} messages={messages} />
<Footer navLinks={resolvedNavLinks} socialLinks={resolvedSocialLinks} messages={messages.Footer} />
```

`Header` takes `Pick<UiMessages, "Header" | "Logo" | "MobileMenu">` and passes each part down to `Logo` and `MobileMenu`.

### Link labels

The site links are configured in `packages/navigation` as `{ id, href }`, where `id` is a key of `UiMessages["Navigation"]` (or `["Social"]`). `resolveLinks(links, labels)` swaps each id for its label, so components still receive plain `{ label, href }` links. The `NavLinkId` and `SocialLinkId` types are derived from `UiMessages`, so a link whose id has no message fails typecheck. See [Site layout](site-layout.md).

## Changing things

- **Change copy**: edit `en.json`. Unit tests keep passing; if the label is one the e2e spec checks, update the spec too.
- **Add a string**: add the key to `UiMessages` (with a doc comment), add it to `en.json`, then use it from the component's `messages` prop. Typecheck fails until both exist.
- **Add a component's copy**: add a new namespace named after the component to `UiMessages` and `en.json`, and give the component a `messages: UiMessages["Name"]` prop.
- **Move to a CMS (e.g. Strapi)**: return a `UiMessages` from the CMS, and swap what `layout.tsx` and the pages pass in for the fetched value. The e2e suite should then run against fixed, seeded content so its hardcoded strings stay valid.
- **Add a locale**: add e.g. `fr.json` with the same shape. Choosing a locale per request isn't built yet, and is where next-intl would come in.

## Testing

Tests hardcode their strings instead of importing `messages`. Each layer does it for a different reason:

- **Unit tests** pass the component a small made-up messages object (e.g. `{ openLabel: "Test open", … }`) and look for those values. That proves the component renders whatever it's given rather than built-in text, without tying the test to the real copy.
- **The [layout e2e spec](../../apps/e2e/tests/layout.spec.ts)** writes out the real copy and routes (`"Open menu"`, `"/about"`, …). It checks what a visitor actually sees and hears, so a typo or a wrong route in `en.json` or `packages/navigation` fails it, which importing the same values would hide. The cost is that renaming a label the spec uses means updating the spec too.
- **Stories** do use the real `messages`, since they document what the ui looks like.

- `pnpm --filter @ethannet/messages test` checks that the export matches `en.json` and that every value is a non-empty string.
- `pnpm typecheck` checks that `en.json` matches `UiMessages`, and that every link id in `packages/navigation` has a message.
- `pnpm --filter @ethannet/navigation test` checks `resolveLinks`, and that every `Navigation`/`Social` message has a link and every href is well formed and unique.

To check that components don't hardcode copy, change a value in `en.json` (e.g. `"Open menu"` → `"Show navigation"`) and run `pnpm test`: the unit tests still pass. `pnpm test:e2e` fails on that label, as it should. Revert the change afterwards.

## Edge cases and limits

- **No interpolation**: values are plain strings. `HelloCard` renders `receivedAtLabel` followed by the timestamp rather than using an ICU `{timestamp}` placeholder.
- **Extra keys** in `en.json` that `UiMessages` doesn't have don't fail typecheck. Remove unused keys by hand.
