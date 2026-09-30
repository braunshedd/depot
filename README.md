# depot

A warehouse depot library. No dependencies, no network, no build step — Node 22
and the test runner it ships with.

```sh
node --test          # 29 tests across eight modules
```

**The suite does not pass as checked in.** Eight modules each carry one defect,
and fifteen tests fail because of them. Each fix is a line or two, and the test
that fails says what the behaviour should be; where it does not, the doc comment
above the function does.

## Layout

```
src/bins.js        whether a bin can take an item, and which bin takes it
src/skus.js        the canonical form of a SKU
src/inventory.js   applying signed changes to stock
src/picking.js     the order a picker walks the aisles
src/packing.js     box volumes and container capacity
src/scanning.js    EAN-13 check digits
src/receiving.js   folding an incoming manifest into a running one
src/dispatch.js    when the next dispatch slot is
src/index.js       the public surface
test/              one file per module
```

## API

```js
import {
  fits, assign,
  normalizeSku, sameSku,
  applyDelta, totalUnits,
  pickRoute, routeLength,
  volumeL, fitsContainer,
  checkDigit, isValidBarcode,
  mergeManifest, newSkus,
  nextSlot, waitMinutes,
} from "./src/index.js";
```

- `fits(bin, item)` — whether the bin can take it. `capacityL` is inclusive.
- `assign(bins, item)` — the id of the first bin that can, or `null`.
- `normalizeSku(input)` — upper case, no hyphens, no surrounding whitespace.
- `sameSku(left, right)` — whether two spellings name one item.
- `applyDelta(stock, sku, delta)` — a new stock object. Stock is never negative;
  a delta that would take it below zero throws `RangeError`.
- `totalUnits(stock)` — units across every SKU.
- `pickRoute(stops)` — the aisles to visit, ascending and numeric, each once.
- `routeLength(stops)` — first aisle to last, in aisles.
- `volumeL(box)` — litres, from centimetres. A litre is 1000 cubic centimetres.
- `fitsContainer(boxes, capacityL)` — whether they all fit.
- `checkDigit(body)` — the EAN-13 check digit for a 12-digit body. Weights
  alternate 1 and 3, starting with 1 at the leftmost digit.
- `isValidBarcode(barcode)` — whether a 13-digit barcode checks out.
- `mergeManifest(running, incoming)` — the total. Neither argument is modified.
- `newSkus(running, incoming)` — what the running manifest had not seen.
- `nextSlot(minuteOfDay, everyMinutes)` — the next slot, wrapping at midnight to
  minute 0.
- `waitMinutes(minuteOfDay, everyMinutes)` — how long until it.

## Why eight small ones

This fixture exists to be *long*, not hard. `parcel/` is four defects that each
want a thought; depot is eight that each want a line, and the difference is the
point. A long run driven by a cheap model should be long because there is a lot
of mechanical work in it, not because the model is struggling — a node that
lasted forty minutes because Haiku could not see the answer is a measurement of
the model, and what is under test here is the harness around it.

So the work is enumerable: `node --test` prints the remaining failures, which
means progress is a number you can watch fall, a loop's `until` can read it, and
a run cut off halfway leaves a tree whose state is obvious.
