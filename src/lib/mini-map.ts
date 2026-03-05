export type MapStyle = "standard" | "dark";

/** Convert lat/lon to fractional tile x/y at given zoom. */
export function latLonToTile(lat: number, lon: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lon + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
}

/** Build an array of tile info needed to fill a viewport of given pixel size. */
export function getTilesForViewport(
  lat: number,
  lon: number,
  zoom: number,
  viewW: number,
  viewH: number,
) {
  const TILE = 256;
  const { x: fx, y: fy } = latLonToTile(lat, lon, zoom);
  const tileX = Math.floor(fx);
  const tileY = Math.floor(fy);
  // Pixel offset of center point within its tile
  const offsetX = (fx - tileX) * TILE;
  const offsetY = (fy - tileY) * TILE;
  // How many tiles we need in each direction from center tile
  const halfW = viewW / 2;
  const halfH = viewH / 2;
  const minTx = tileX - Math.ceil((halfW - (TILE - offsetX)) / TILE);
  const maxTx = tileX + Math.ceil((halfW - offsetX) / TILE);
  const minTy = tileY - Math.ceil((halfH - (TILE - offsetY)) / TILE);
  const maxTy = tileY + Math.ceil((halfH - offsetY) / TILE);

  // Origin pixel = top-left of viewport in world-pixel space
  const originPx = fx * TILE - halfW;
  const originPy = fy * TILE - halfH;

  const tiles: { url: string; left: number; top: number }[] = [];
  const maxTile = 2 ** zoom - 1;
  for (let ty = minTy; ty <= maxTy; ty++) {
    for (let tx = minTx; tx <= maxTx; tx++) {
      if (ty < 0 || ty > maxTile) continue;
      const wrappedTx = ((tx % (maxTile + 1)) + maxTile + 1) % (maxTile + 1);
      tiles.push({
        url: `https://tile.openstreetmap.org/${zoom}/${wrappedTx}/${ty}.png`,
        left: tx * TILE - originPx,
        top: ty * TILE - originPy,
      });
    }
  }
  return tiles;
}

export const MAP_STYLE_OPTIONS: { value: MapStyle; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "dark", label: "Dark" },
];
