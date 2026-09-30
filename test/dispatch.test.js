import { test } from "node:test";
import assert from "node:assert/strict";
import { nextSlot, waitMinutes } from "../src/dispatch.js";

test("the next slot is the next multiple of the interval", () => {
  assert.equal(nextSlot(0, 30), 30);
  assert.equal(nextSlot(31, 30), 60);
});

test("the day wraps to midnight", () => {
  assert.equal(nextSlot(1439, 30), 0);
  assert.equal(nextSlot(1410, 30), 0);
});

test("waiting across midnight is a short wait, not a negative one", () => {
  assert.equal(waitMinutes(1439, 30), 1);
  assert.equal(waitMinutes(0, 30), 30);
});

test("a non-positive interval is rejected", () => {
  assert.throws(() => nextSlot(0, 0), RangeError);
});
