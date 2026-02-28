export type QRErrorCorrection = "L" | "M" | "Q" | "H";
export type QRModuleStyle = "square" | "rounded" | "dots";
export type QRSize = "sm" | "md" | "lg";

export const QR_SIZE_MAP: Record<QRSize, number> = {
  sm: 150,
  md: 200,
  lg: 280,
};

// Simplified QR code generator using byte mode
// Supports up to ~300 characters with error correction level M

const EC_CODEWORDS: Record<QRErrorCorrection, number[]> = {
  L: [7, 10, 15, 20, 26, 36, 44, 52, 60, 72, 80, 96, 104, 120, 132, 144, 156, 168, 184, 196],
  M: [10, 16, 26, 36, 48, 64, 72, 88, 100, 116, 124, 144, 160, 172, 192, 208, 224, 240, 260, 280],
  Q: [13, 22, 36, 52, 72, 96, 108, 132, 156, 180, 192, 224, 252, 268, 292, 320, 340, 364, 396, 420],
  H: [17, 28, 44, 64, 88, 112, 132, 152, 180, 208, 224, 264, 292, 316, 340, 372, 400, 432, 464, 504],
};

const DATA_CAPACITY_BYTE: Record<QRErrorCorrection, number[]> = {
  L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858],
  M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666],
  Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482],
  H: [7, 14, 24, 34, 44, 58, 64, 84, 100, 122, 140, 158, 180, 197, 223, 253, 283, 313, 341, 385],
};

function getMinVersion(data: string, ec: QRErrorCorrection): number {
  const byteLen = new TextEncoder().encode(data).length;
  const caps = DATA_CAPACITY_BYTE[ec];
  for (let i = 0; i < caps.length; i++) {
    if (byteLen <= caps[i]) return i + 1;
  }
  return -1; // data too long
}

// Reed-Solomon GF(256) math
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

(function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = x << 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsEncode(data: Uint8Array, nsym: number): Uint8Array {
  const gen = new Uint8Array(nsym + 1);
  gen[0] = 1;
  for (let i = 0; i < nsym; i++) {
    for (let j = nsym; j > 0; j--) {
      gen[j] = gen[j] ^ gfMul(gen[j - 1], GF_EXP[i]);
    }
  }

  const result = new Uint8Array(nsym);
  for (let i = 0; i < data.length; i++) {
    const coef = data[i] ^ result[0];
    result.copyWithin(0, 1);
    result[nsym - 1] = 0;
    if (coef !== 0) {
      for (let j = 0; j < nsym; j++) {
        result[j] ^= gfMul(gen[j + 1], coef);
      }
    }
  }
  return result;
}

// Simplified QR matrix builder
export interface QRMatrix {
  size: number;
  modules: boolean[][];
}

export function generateQR(data: string, ec: QRErrorCorrection = "M"): QRMatrix | null {
  if (!data) return null;

  const version = getMinVersion(data, ec);
  if (version < 0 || version > 20) return null;

  const size = 17 + version * 4;
  const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Place finder patterns
  const placeFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r, cc = col + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        reserved[rr][cc] = true;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          modules[rr][cc] =
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        }
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    modules[6][i] = i % 2 === 0;
    reserved[6][i] = true;
    modules[i][6] = i % 2 === 0;
    reserved[i][6] = true;
  }

  // Dark module
  modules[size - 8][8] = true;
  reserved[size - 8][8] = true;

  // Reserve format info areas
  for (let i = 0; i < 9; i++) {
    if (i < size) { reserved[8][i] = true; reserved[i][8] = true; }
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][size - 8 + i] = true;
    reserved[size - 8 + i][8] = true;
  }

  // Alignment patterns (version >= 2)
  if (version >= 2) {
    const positions = getAlignmentPositions(version);
    for (const r of positions) {
      for (const c of positions) {
        if (reserved[r]?.[c]) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const rr = r + dr, cc = c + dc;
            if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
              reserved[rr][cc] = true;
              modules[rr][cc] =
                Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
            }
          }
        }
      }
    }
  }

  // Version info (version >= 7)
  if (version >= 7) {
    const versionBits = getVersionBits(version);
    for (let i = 0; i < 18; i++) {
      const bit = ((versionBits >> i) & 1) === 1;
      const r = Math.floor(i / 3);
      const c = size - 11 + (i % 3);
      modules[r][c] = bit;
      reserved[r][c] = true;
      modules[c][r] = bit;
      reserved[c][r] = true;
    }
  }

  // Encode data
  const bytes = new TextEncoder().encode(data);
  const totalCodewords = getTotalCodewords(version);
  const ecCodewords = EC_CODEWORDS[ec][version - 1];
  const dataCodewords = totalCodewords - ecCodewords;

  // Build data bitstream: mode(4) + count(8 or 16) + data + terminator + padding
  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  pushBits(0b0100, 4); // Byte mode
  pushBits(bytes.length, version < 10 ? 8 : 16); // Character count
  for (const b of bytes) pushBits(b, 8);

  // Terminator
  const maxBits = dataCodewords * 8;
  const termLen = Math.min(4, maxBits - bits.length);
  pushBits(0, termLen);

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad codewords
  const padBytes = [0xEC, 0x11];
  let padIdx = 0;
  while (bits.length < maxBits) {
    pushBits(padBytes[padIdx], 8);
    padIdx = (padIdx + 1) % 2;
  }

  // Convert to bytes
  const dataBytes = new Uint8Array(dataCodewords);
  for (let i = 0; i < dataCodewords; i++) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bits[i * 8 + j] || 0);
    }
    dataBytes[i] = byte;
  }

  // RS error correction
  const ecBytes = rsEncode(dataBytes, ecCodewords);

  // Interleave (simplified for single block)
  const allBytes = new Uint8Array(totalCodewords);
  allBytes.set(dataBytes);
  allBytes.set(ecBytes, dataCodewords);

  // Place data bits
  const allBits: number[] = [];
  for (const b of allBytes) {
    for (let i = 7; i >= 0; i--) allBits.push((b >> i) & 1);
  }

  let bitIdx = 0;
  let right = size - 1;
  let upward = true;

  while (right >= 0) {
    if (right === 6) right--; // Skip timing column

    const rowRange = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rowRange) {
      for (const colOff of [0, 1]) {
        const col = right - colOff;
        if (col < 0 || reserved[row][col]) continue;
        modules[row][col] = bitIdx < allBits.length ? allBits[bitIdx] === 1 : false;
        bitIdx++;
      }
    }

    right -= 2;
    upward = !upward;
  }

  // Apply mask pattern 0: (row + col) % 2 === 0
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && (r + c) % 2 === 0) {
        modules[r][c] = !modules[r][c];
      }
    }
  }

  // Place format info (mask 0, EC level)
  const formatBits = getFormatBits(ec, 0);
  for (let i = 0; i < 15; i++) {
    const bit = ((formatBits >> (14 - i)) & 1) === 1;
    // Around top-left finder
    if (i < 6) modules[8][i] = bit;
    else if (i === 6) modules[8][7] = bit;
    else if (i === 7) modules[8][8] = bit;
    else if (i === 8) modules[7][8] = bit;
    else modules[14 - i][8] = bit;

    // Around other finders
    if (i < 8) modules[size - 1 - i][8] = bit;
    else modules[8][size - 15 + i] = bit;
  }

  return { size, modules };
}

function getTotalCodewords(version: number): number {
  const size = 17 + version * 4;
  let total = size * size;
  // Subtract function patterns
  total -= 3 * 64; // finder patterns + separators
  total -= 2 * (size - 16); // timing patterns
  total -= 1; // dark module
  total -= 31; // format info (2*15 + 1 overlap)
  if (version >= 2) {
    const positions = getAlignmentPositions(version);
    let alignCount = positions.length * positions.length;
    // Subtract overlapping with finders
    alignCount -= 3; // approximate for small versions
    if (alignCount < 0) alignCount = 0;
    total -= alignCount * 25;
  }
  if (version >= 7) total -= 36; // version info
  return Math.floor(total / 8);
}

function getAlignmentPositions(version: number): number[] {
  if (version === 1) return [];
  const intervals = Math.floor(version / 7) + 1;
  const size = 17 + version * 4;
  const last = size - 7;
  const first = 6;
  if (intervals === 1) return [first, last];
  const step = Math.ceil((last - first) / intervals / 2) * 2;
  const positions = [first];
  let pos = last;
  while (pos > first + step) {
    positions.unshift(pos);
    pos -= step;
  }
  positions.splice(1, 0, ...Array.from({ length: intervals - 1 }, (_, i) => first + (i + 1) * step).filter(p => !positions.includes(p)));
  // Simplified: just return first and last for small versions
  const result = [first];
  const count = intervals + 1;
  const dist = last - first;
  for (let i = 1; i < count - 1; i++) {
    result.push(first + Math.round(dist * i / (count - 1) / 2) * 2);
  }
  result.push(last);
  return [...new Set(result)].sort((a, b) => a - b);
}

function getFormatBits(ec: QRErrorCorrection, mask: number): number {
  const ecBits: Record<QRErrorCorrection, number> = { L: 1, M: 0, Q: 3, H: 2 };
  let data = (ecBits[ec] << 3) | mask;
  let bits = data << 10;
  // BCH(15,5) encoding
  const gen = 0x537;
  for (let i = 4; i >= 0; i--) {
    if (bits & (1 << (i + 10))) bits ^= gen << i;
  }
  bits = (data << 10) | bits;
  return bits ^ 0x5412; // XOR mask
}

function getVersionBits(version: number): number {
  let bits = version << 12;
  const gen = 0x1F25;
  for (let i = 5; i >= 0; i--) {
    if (bits & (1 << (i + 12))) bits ^= gen << i;
  }
  return (version << 12) | bits;
}
