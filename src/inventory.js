import { normalizeSku } from "./skus.js";

/**
 * Apply a signed change to one SKU's count, returning a new stock object.
 *
 * Stock is never negative: a delta that would take a count below zero is a
 * counting error upstream, and it throws a `RangeError` rather than recording
 * an impossible shelf.
 */
export function applyDelta(stock, sku, delta) {
  const key = normalizeSku(sku);
  const next = { ...stock };
  next[key] = (next[key] ?? 0) + delta;
  return next;
}

/** The total number of units across every SKU. */
export function totalUnits(stock) {
  return Object.values(stock).reduce((sum, n) => sum + n, 0);
}
