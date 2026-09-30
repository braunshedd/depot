/**
 * Fold an incoming manifest into a running one, returning the total.
 *
 * Neither argument is modified. A receiving clerk re-runs a merge after a
 * miscount, and a merge that edited the running manifest in place would double
 * the second attempt.
 */
export function mergeManifest(running, incoming) {
  for (const [sku, count] of Object.entries(incoming)) {
    running[sku] = (running[sku] ?? 0) + count;
  }
  return running;
}

/** The SKUs in `incoming` that the running manifest had never seen. */
export function newSkus(running, incoming) {
  return Object.keys(incoming).filter((sku) => !(sku in running));
}
