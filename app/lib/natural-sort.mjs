const naturalTextCollator = new Intl.Collator("en", {
  usage: "sort",
  numeric: true,
  sensitivity: "variant",
});

/**
 * Compare human-readable labels alphabetically while treating digit runs as
 * numbers, so “104” sorts before “1029”.
 *
 * @param {string} left
 * @param {string} right
 */
export function compareNaturalText(left, right) {
  const naturalOrder = naturalTextCollator.compare(left, right);
  if (naturalOrder !== 0) return naturalOrder;
  return left < right ? -1 : left > right ? 1 : 0;
}
