const data = await Bun.file("4.data.txt").text();
const lines = data
  .trim()
  .split("\n")
  .map((e) => e.trim())
  .map((line) => line.split(""));

const X_LIMIT = lines[0]!.length;
const Y_LIMIT = lines.length;

// console.log(lines);

const boundaryChecker = (x: number, y: number) => {
  if (x >= 0 && x < X_LIMIT && y >= 0 && y < Y_LIMIT) {
    return true;
  }
  return false;
};

const getAdjacents = (x: number, y: number): string[] => {
  //   console.log("-------------------------");
  const north = [x, y - 1];
  const northEast = [x + 1, y - 1];
  const east = [x + 1, y];
  const southEast = [x + 1, y + 1];
  const south = [x, y + 1];
  const southWest = [x - 1, y + 1];
  const west = [x - 1, y];
  const northWest = [x - 1, y - 1];

  const adjacentCoordinates = [
    north,
    northEast,
    east,
    southEast,
    south,
    southWest,
    west,
    northWest,
  ].filter((adj) => boundaryChecker(adj[0] as number, adj[1] as number));
  //   console.log({ adjacentCoordinates });

  let total: string[] = [];
  adjacentCoordinates.forEach((adj) => {
    const val = lines?.[adj[1] as number]?.[adj[0] as number] ?? undefined;
    // console.log(val, adj);
    if (!val) {
      //   console.log("Something went wrong probably???");
      return;
    }
    total.push(val);
  });

  return total;
};

let answer = 0;

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y]!.length; x++) {
    const isRollOfPaper = lines![y]![x] === "@";
    if (isRollOfPaper) {
      const adjacents = getAdjacents(x, y);
      //   console.log(adjacents);
      const rollsOfPapers = adjacents.filter((c) => c === "@");
      //   console.log("rollsOfPapers found", rollsOfPapers);
      if (rollsOfPapers.length < 4) {
        // console.log("increasing ans");
        answer++;
      }

      //   console.log("-------------------------");
    }
  }
}
console.log(answer);

// console.log(getAdjacents(1, 0));
