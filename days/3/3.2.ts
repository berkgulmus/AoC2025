const data = await Bun.file("3.data.txt").text();
const banks = data
  .trim()
  .split("\n")
  .map((e) => e.trim());
// console.log(banks);

const findBiggestDigit = (str: string) => {
  const strArr = str.split("");
  const sortedStr = [...strArr].sort().reverse();
  const biggestNum = sortedStr[0];
  const biggestIndex = strArr.findIndex((num) => num === biggestNum);

  return { val: biggestNum, index: biggestIndex };
};

const calculateBank = (bank: string, n: number): number => {
  console.log("called with bank:", bank, " - n:", n);
  const { val: biggest, index: biggestIndex } = findBiggestDigit(
    bank.slice(0, n ? -n : undefined)
  );

  if (n > 0) {
    console.log("will return via recursion", Number(biggest) * (10 ^ n));

    return (
      Number(biggest) * Math.pow(10, n) +
      calculateBank(bank.slice(biggestIndex + 1), n - 1)
    );
  } else {
    console.log("will return", Number(biggest));
    return Number(biggest);
  }
};

const result = banks.reduce((cur, bank) => {
  const result = cur + calculateBank(bank, 11);
  console.log("result", result);
  return result;
}, 0);
console.log({ result });
