import type { UiMessages } from "@ethannet/types";
import en from "../messages/en.json";

/**
 * The ui's English copy. Annotating it as {@link UiMessages} makes `tsc` fail if
 * `en.json` is missing a key or has the wrong shape.
 *
 * Inject this from the ui's composition root (`app/layout.tsx`) and import it in
 * tests; components never import it directly. Swapping to a CMS later means
 * replacing this source, not the components.
 */
export const messages: UiMessages = en;
