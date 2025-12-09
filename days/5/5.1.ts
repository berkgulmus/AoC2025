const recursiveComparator = (a: string, b: string) => {
  if (a.length !== b.length) {
    console.log("That shouldnt have happened...");
    return null;
  }

  const aFirst = Number(a.charAt(0));
  const bFirst = Number(b.charAt(0));

  if (aFirst > bFirst) {
    return -1;
  } else if (aFirst < bFirst) {
    return 1;
  } else {
    if (a.length === 1) {
      return 0;
    } else {
      // else we crop the first char & redo the whole thing
      return recursiveComparator(a.slice(1), b.slice(1));
    }
  }
};

const checkRangeValidity = (
  value: string,
  range: [string, string]
): boolean => {
  const rangeStartLength = range[0].length;
  const rangeEndLength = range[1].length;
  const valLen = value.length;

  // easy checks for returning early
  if (valLen > rangeEndLength || valLen < rangeStartLength) {
    return false;
  }
  if (valLen < rangeEndLength && valLen > rangeStartLength) {
    return true;
  }

  let result = true;
  if (valLen === rangeStartLength) {
    if (recursiveComparator(range[0], value) === -1) {
      result = false;
    }
  }

  if (valLen === rangeEndLength) {
    if (recursiveComparator(value, range[1]) === -1) {
      result = false;
    }
  }

  return result;
};

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

const freshIngredients: string[] = [];
VALUES.forEach((ingredient) => {
  if (
    RANGES.some((range) => {
      const checkResult = checkRangeValidity(ingredient, range);
      if (checkResult) {
        console.log({ ingredient, range });
      }
      return checkResult;
    })
  ) {
    freshIngredients.push(ingredient);
  }
});

console.log(freshIngredients.length);
