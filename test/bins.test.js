import { test } from "node:test";
import assert from "node:assert/strict";
import { fits, assign } from "../src/bins.js";

const bins = [
  { id: "A", capacityL: 5 },
  { id: "B", capacityL: 20 },
];

test("an item smaller than the bin fits", () => {
  assert.equal(fits(bins[0], { volumeL: 3 }), true);
});

test("capacity is inclusive", () => {
  assert.equal(fits(bins[0], { volumeL: 5 }), true);
});

test("an item larger than the bin does not fit", () => {
  assert.equal(fits(bins[0], { volumeL: 6 }), false);
});

test("assign takes the first bin that can hold the item", () => {
  assert.equal(assign(bins, { volumeL: 5 }), "A");
  assert.equal(assign(bins, { volumeL: 12 }), "B");
  assert.equal(assign(bins, { volumeL: 99 }), null);
});
