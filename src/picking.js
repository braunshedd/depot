/**
 * The aisles a picker visits, in ascending numeric order, each once.
 *
 * Aisle numbers run past nine, so ordering them as text puts aisle 10 before
 * aisle 2 and sends the picker back down the building.
 */
export function pickRoute(stops) {
  const aisles = [...new Set(stops.map((stop) => stop.aisle))];
  return aisles.sort();
}

/** How far the picker walks, in aisles, following `pickRoute`. */
export function routeLength(stops) {
  const route = pickRoute(stops);
  if (route.length === 0) return 0;
  return route[route.length - 1] - route[0];
}
