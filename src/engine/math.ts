export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function roundToMultiple(n: number, m: number) {
  return Math.round(n / m) * m;
}

export function stPerCm(stPer10cm: number) {
  return stPer10cm / 10;
}

export function rowsPerCm(rowsPer10cm: number) {
  return rowsPer10cm / 10;
}
