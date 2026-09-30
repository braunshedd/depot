/**
 * The canonical form of a SKU: upper case, no hyphens, no surrounding
 * whitespace. Scanners and spreadsheets both produce untidy input, so the
 * normalizer is what the rest of the library compares on.
 */
export function normalizeSku(input) {
  return String(input).toUpperCase().replace(/-/g, "");
}

/** Whether two SKUs name the same item, however they were written. */
export function sameSku(left, right) {
  return normalizeSku(left) === normalizeSku(right);
}
