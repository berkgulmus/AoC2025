// Messy data prep -----------------
const data = await Bun.file("5.data.txt").text();
const lines = data
  .trim()
  .split("\n")
  .map((e) => e.trim());
let seenSeparatorLine = false;
const RANGES: [string, string][] = [];
const VALUES: string[] = [];
lines.forEach((line) => {
  //   console.log("line:", line);
  if (line === "") {
    // console.log("seenSeparatorLine = true");
    seenSeparatorLine = true;
  } else {
    if (!seenSeparatorLine) {
      //   console.log("range will push ", line.split("-"));
      RANGES.push(line.split("-") as [string, string]);
    } else {
      //   console.log("value will push ", line);
      VALUES.push(line);
    }
  }
});
// ---------------------------------------

type rangePoint = {
  position: number;
  type: "Start" | "End";
  id: number;
};

// we basically put all the range start/end points on a line
const rangesOnAxis: rangePoint[] = [];
RANGES.forEach((range, i) => {
  rangesOnAxis.push({
    position: Number(range[0]),
    id: i,
    type: "Start",
  });
  rangesOnAxis.push({
    position: Number(range[1]),
    id: i,
    type: "End",
  });
});

// & sort them according to their positions
rangesOnAxis.sort((a, b) => {
  if (a.position !== b.position) {
    return a.position - b.position;
  } else if (a.type !== b.type) {
    return a.type === "Start" ? -1 : 1;
  } else return 0;
});

rangesOnAxis.forEach((r) => console.log(r));

let currentOpenRanges: number[] = [];
let total = 0;
let refPosition = 0;
rangesOnAxis.forEach((point) => {
  if (point.type === "Start") {
    if (currentOpenRanges.length === 0) refPosition = point.position;
    currentOpenRanges.push(point.id);
  } else if (point.type === "End") {
    currentOpenRanges = currentOpenRanges.filter((i) => i !== point.id);
    if (currentOpenRanges.length === 0) {
      total += point.position - refPosition + 1;
    }
  }
});

console.log(total);
