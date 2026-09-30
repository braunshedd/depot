import { test } from "node:test";
import assert from "node:assert/strict";
import { pickRoute, routeLength } from "../src/picking.js";

const stops = [{ aisle: 2 }, { aisle: 10 }, { aisle: 1 }, { aisle: 2 }];

test("aisles come back in ascending numeric order", () => {
  assert.deepEqual(pickRoute(stops), [1, 2, 10]);
});

test("each aisle appears once", () => {
  assert.equal(pickRoute(stops).length, 3);
});

test("the route length spans first aisle to last", () => {
  assert.equal(routeLength(stops), 9);
  assert.equal(routeLength([]), 0);
});
