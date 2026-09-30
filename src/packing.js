/**
 * The volume of a box in litres, from its dimensions in centimetres.
 *
 * One litre is 1000 cubic centimetres.
 */
export function volumeL(box) {
  return (box.widthCm * box.heightCm * box.depthCm) / 100;
}

/** Whether a set of boxes fits inside a container of `capacityL` litres. */
export function fitsContainer(boxes, capacityL) {
  const total = boxes.reduce((sum, box) => sum + volumeL(box), 0);
  return total <= capacityL;
}
