// utils/scaler.ts

const mean = [243.43363288236606, 1.6229022006657634, 179823.00330705347];
const scale = [142.30599703402092, 1.4552011627896262, 605120.0261503863];

export function scaleInput(input: number[]): number[] {
  return input.map((val, idx) => (val - mean[idx]) / scale[idx]);
}