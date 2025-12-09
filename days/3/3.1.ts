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

  //   console.log({
  //     beforeSort: strArr,
  //     afterSort: sortedStr,
  //     biggestNum,
  //     biggestIndex,
  //     len: str.length,
  //   });
  return { val: biggestNum, index: biggestIndex };
};

const calculateBank = (bank: string) => {
  const { val: biggest, index: biggestIndex } = findBiggestDigit(
    bank.slice(0, -1)
  );

  const { val: secondBiggest } = findBiggestDigit(bank.slice(biggestIndex + 1));
  //   console.log(biggest, biggestIndex, secondBiggest);
  return Number(biggest) * 10 + Number(secondBiggest);
};

const result = banks.reduce((cur, bank) => cur + calculateBank(bank), 0);
console.log({ result });
