const data = await Bun.file("6.data.txt").text();
const lines = data
  .trim()
  .split("\n")
  .map((e) => e.trim())
  .map((line) => line.split(" ").filter(Boolean))
  .reverse();

const X = lines[0]!.length;
const Y = lines.length;

let total = 0;
for (let i = 0; i < X; i++) {
  const operation = lines[0]![i];
  let answer = operation === "+" ? 0 : 1;
  for (let j = 1; j < Y; j++) {
    if (operation === "+") {
      answer += Number(lines[j]![i]!);
    } else if (operation === "*") {
      answer *= Number(lines[j]![i]!);
    }
  }
  total += answer;
}
console.log(total);
