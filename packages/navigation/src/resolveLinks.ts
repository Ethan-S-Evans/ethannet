import type { LinkConfig } from "@ethannet/types";

/**
 * Turns configured links into renderable ones by looking up each link's label
 * in a messages namespace. Order follows `links`.
 *
 * The `labels` type is keyed by the links' ids, so a config id with no message
 * (or a renamed message key) fails typecheck rather than rendering blank.
 */
export function resolveLinks<Id extends string>(
  links: readonly LinkConfig<Id>[],
  labels: Readonly<Record<Id, string>>,
): { label: string; href: string }[] {
  return links.map(({ id, href }) => ({ label: labels[id], href }));
}
