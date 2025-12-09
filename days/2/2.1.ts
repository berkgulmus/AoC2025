const digitCounter = (num: number) => Math.floor(Math.log10(num)) + 1;
let total = 0;
const calculateRangeValids = (_input: string) => {
  const _i = _input.split("-");
  const start: number = Number(_i[0]) as number;
  const end: number = Number(_i[1]) as number;

  for (let i = start; i <= end; i++) {
    const digitCount = digitCounter(i);
    if (digitCount % 2 !== 0) {
    } else {
      const stringReprs = i.toString();
      const firstPart = stringReprs.slice(0, digitCount / 2);
      const secondPart = stringReprs.slice(digitCount / 2);
      if (firstPart === secondPart) {
        total += i;
        console.log({ firstPart, secondPart, stringReprs });
      }
    }
  }
};

const data = await Bun.file("2.data.txt").text();
const ranges = data.split(",");
// ranges.map((range, i) => console.log({ range, i }));
ranges.map((range) => calculateRangeValids(range));
// calculateRangeValids(ranges[41]);
console.log("Total calculated", total);
