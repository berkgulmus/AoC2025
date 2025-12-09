const data = await Bun.file("1.1_data.txt").text();
const lines = data
  .trim()
  .split("\n")
  .map((e) => e.trim());

let total = 0;

lines.reduce((prev, cur) => {
  const multiplier = cur.charAt(0) === "R" ? 1 : -1;
  const res = prev + multiplier * Number(cur.slice(1));
  console.log(res);
  if (res % 100 === 0) total += 1;
  return res;
}, 50);

console.log(total);
