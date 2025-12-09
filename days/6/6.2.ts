const calculate = (values: number[], operation: "*" | "+") => {
  if (operation === "*") {
    return values.reduce((prev, cur) => prev * cur, 1);
  } else if (operation === "+") {
    return values.reduce((prev, cur) => prev + cur, 0);
  } else {
    console.log("wtf", operation);
    return 0;
  }
};

const data = await Bun.file("6.data.txt").text();
const lines = data
  .replaceAll("\r", "")
  .split("\n")
  .map((line) => line.split(""));

const xLen = lines[0]!.length;
const yLen = lines.length;

let valueMemory = [];
let total = 0;

for (let x = xLen - 1; x > -1; x--) {
  let columnMemory = "";
  for (let y = 0; y < yLen - 1; y++) {
    if (lines[y]![x]! !== " ") {
      columnMemory += lines[y]![x]!;
    }
  }

  // empty strings were being converted to number 0 & wrecking havoc on multiply ops...
  const columnVal = columnMemory ? Number(columnMemory) : undefined;
  if (columnVal !== undefined) valueMemory.push(columnVal);

  if (lines[yLen - 1]![x]! !== " ") {
    console.log({ x, valueMemory, op: lines[yLen - 1]![x]! });
    total += calculate(valueMemory, lines[yLen - 1]![x]! as "+" | "*");
    valueMemory = [];
  }
}
console.log(total);
