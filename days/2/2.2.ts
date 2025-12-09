// I thought this might be better than calculation it on the fly
const FACTORS_MAP = {
  1: [],
  2: [1],
  3: [1],
  4: [1, 2],
  5: [1],
  6: [1, 2, 3],
  7: [1],
  8: [1, 2, 4],
  9: [1, 3],
  10: [1, 2, 5, 1],
  11: [1, 1],
  12: [1, 2, 3, 4, 6, 1],
  13: [1, 1],
  14: [1, 2, 7, 1],
  15: [1, 3, 5, 1],
  16: [1, 2, 4, 8, 1],
  17: [1, 1],
  18: [1, 2, 3, 6, 9, 1],
  19: [1, 1],
  20: [1, 2, 4, 5, 10, 2],
  21: [1, 3, 7, 2],
  22: [1, 2, 11, 2],
  23: [1, 2],
  24: [1, 2, 3, 4, 6, 8, 12, 2],
  25: [1, 5, 2],
  26: [1, 2, 13, 2],
  27: [1, 3, 9, 2],
  28: [1, 2, 4, 7, 14, 2],
  29: [1, 2],
  30: [1, 2, 3, 5, 6, 10, 15, 3],
  31: [1, 3],
  32: [1, 2, 4, 8, 16, 3],
  33: [1, 3, 11, 3],
  34: [1, 2, 17, 3],
  35: [1, 5, 7, 3],
  36: [1, 2, 3, 4, 6, 9, 12, 18, 3],
  37: [1, 3],
  38: [1, 2, 19, 3],
  39: [1, 3, 13, 3],
  40: [1, 2, 4, 5, 8, 10, 20, 4],
};
const digitCounter = (num: number) => Math.floor(Math.log10(num)) + 1;

let total = 0;
// generic repeating checker
const checkRepeatingN = (str: string, n: number) => {
  let result = true;
  for (let i = 0; i < str.length / n - 1; i++) {
    for (let j = 0; j < n; j++) {
      if (str.charAt(i * n + j) !== str.charAt((i + 1) * n + j)) {
        result = false;
        return;
      }
    }
    if (!result) return;
  }
  return result;
};
const calculateRangeValids = (_input: string) => {
  const _i = _input.split("-");
  const start: number = Number(_i[0]) as number;
  const end: number = Number(_i[1]) as number;

  for (let i = start; i <= end; i++) {
    const digitCount = digitCounter(i);
    const factorsOfN = FACTORS_MAP[digitCount as keyof typeof FACTORS_MAP];

    const result = factorsOfN.some((factor) => {
      const checkResult = checkRepeatingN(i.toString(), factor);
      if (checkResult) console.log("Found for", { i, factor });
      return checkResult;
    });
    if (result) total += i;
  }
};

const data = await Bun.file("2.data.txt").text();
const ranges = data.split(",");
// ranges.map((range, i) => console.log({ range, i }));
ranges.map((range) => calculateRangeValids(range));
// calculateRangeValids(ranges[41]);
console.log("Total calculated", total);
