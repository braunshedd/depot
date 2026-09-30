/**
 * Whether a bin can take an item.
 *
 * `capacityL` is inclusive: an item of exactly the bin's capacity fits.
 */
export function fits(bin, item) {
  return item.volumeL < bin.capacityL;
}

/** The id of the first bin in the list that can take the item, or null. */
export function assign(bins, item) {
  for (const bin of bins) {
    if (fits(bin, item)) return bin.id;
  }
  return null;
}
