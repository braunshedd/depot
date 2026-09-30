/**
 * The check digit for a 12-digit barcode body, as EAN-13 defines it.
 *
 * Each digit is weighted by its position, alternating 1 and 3 and **starting
 * with 1** at the leftmost digit. The check digit is what takes the weighted
 * sum up to the next multiple of ten.
 */
export function checkDigit(body) {
  if (!/^\d{12}$/.test(body)) throw new TypeError("a barcode body is 12 digits");
  let sum = 0;
  for (let index = 0; index < body.length; index += 1) {
    const weight = index % 2 === 0 ? 3 : 1;
    sum += Number(body[index]) * weight;
  }
  return (10 - (sum % 10)) % 10;
}

/** Whether a full 13-digit barcode carries the right check digit. */
export function isValidBarcode(barcode) {
  if (!/^\d{13}$/.test(barcode)) return false;
  return checkDigit(barcode.slice(0, 12)) === Number(barcode[12]);
}
