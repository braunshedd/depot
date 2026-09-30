import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeManifest, newSkus } from "../src/receiving.js";

test("counts are summed across the two manifests", () => {
  assert.deepEqual(mergeManifest({ AB123: 2 }, { AB123: 3, XY999: 1 }), {
    AB123: 5,
    XY999: 1,
  });
});

test("neither argument is modified", () => {
  const running = { AB123: 2 };
  const incoming = { AB123: 3 };
  mergeManifest(running, incoming);
  assert.deepEqual(running, { AB123: 2 });
  assert.deepEqual(incoming, { AB123: 3 });
});

test("re-running a merge gives the same answer", () => {
  const running = { AB123: 2 };
  const first = mergeManifest(running, { AB123: 3 });
  const second = mergeManifest(running, { AB123: 3 });
  assert.notEqual(first, running);
  assert.deepEqual(first, second);
});

test("newSkus names what the running manifest had not seen", () => {
  assert.deepEqual(newSkus({ AB123: 2 }, { AB123: 1, XY999: 1 }), ["XY999"]);
});
