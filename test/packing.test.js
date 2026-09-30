import { test } from "node:test";
import assert from "node:assert/strict";
import { volumeL, fitsContainer } from "../src/packing.js";

const cube = { widthCm: 10, heightCm: 10, depthCm: 10 };

test("a ten-centimetre cube is one litre", () => {
  assert.equal(volumeL(cube), 1);
});

test("a twenty-centimetre cube is eight litres", () => {
  assert.equal(volumeL({ widthCm: 20, heightCm: 20, depthCm: 20 }), 8);
});

test("a container holds what fits and refuses what does not", () => {
  assert.equal(fitsContainer([cube, cube], 2), true);
  assert.equal(fitsContainer([cube, cube], 1), false);
});
