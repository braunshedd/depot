import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeSku, sameSku } from "../src/skus.js";

test("normalizing upper-cases and drops hyphens", () => {
  assert.equal(normalizeSku("ab-123"), "AB123");
});

test("normalizing trims surrounding whitespace", () => {
  assert.equal(normalizeSku("  ab-123 \n"), "AB123");
});

test("two spellings of one SKU are the same SKU", () => {
  assert.equal(sameSku(" AB123", "ab-123"), true);
});
