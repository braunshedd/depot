import { test } from "node:test";
import assert from "node:assert/strict";
import { checkDigit, isValidBarcode } from "../src/scanning.js";

test("the check digit of a known barcode", () => {
  assert.equal(checkDigit("400638133393"), 1);
});

test("a body of all zeroes checks to zero", () => {
  assert.equal(checkDigit("000000000000"), 0);
});

test("a full barcode validates against its own check digit", () => {
  assert.equal(isValidBarcode("4006381333931"), true);
  assert.equal(isValidBarcode("4006381333932"), false);
  assert.equal(isValidBarcode("40063813339"), false);
});

test("a body that is not twelve digits is rejected", () => {
  assert.throws(() => checkDigit("123"), TypeError);
});
