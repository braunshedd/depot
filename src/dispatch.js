/**
 * The next dispatch slot at or after a minute of the day.
 *
 * Slots run every `everyMinutes` from midnight, and the day wraps: the next
 * slot after the last one of the day is the first one of the next day, which is
 * minute 0 and never minute 1440 or beyond.
 */
export function nextSlot(minuteOfDay, everyMinutes) {
  if (everyMinutes <= 0) throw new RangeError("slots repeat on a positive interval");
  return minuteOfDay + (everyMinutes - (minuteOfDay % everyMinutes));
}

/** How many minutes a shipment waits for its slot. */
export function waitMinutes(minuteOfDay, everyMinutes) {
  const slot = nextSlot(minuteOfDay, everyMinutes);
  return slot >= minuteOfDay ? slot - minuteOfDay : 1440 - minuteOfDay + slot;
}
