import { test } from "node:test";
import assert from "node:assert/strict";
import { applyDelta, totalUnits } from "../src/inventory.js";

test("a positive delta adds to the count", () => {
  assert.deepEqual(applyDelta({ AB123: 2 }, "ab-123", 3), { AB123: 5 });
});

test("a delta on an unseen SKU starts from zero", () => {
  assert.deepEqual(applyDelta({}, "XY999", 4), { XY999: 4 });
});

test("stock never goes negative", () => {
  assert.throws(() => applyDelta({ AB123: 2 }, "AB123", -5), RangeError);
});

test("totalUnits sums every SKU", () => {
  assert.equal(totalUnits({ AB123: 2, XY999: 4 }), 6);
});
