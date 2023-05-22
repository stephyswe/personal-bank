import { getMonthlySums } from "./api/getMonthlySums";
import { subtractArrays } from "./api/subtractArrays";

export const filterAndFillData = (income, expenses, startVal, hasStart) => {
  let inc = getMonthlySums(income);
  inc[0] += startVal;
  const exp = getMonthlySums(expenses);
  const newArr = subtractArrays(inc, exp);
  if (hasStart) {
    newArr.unshift(startVal);
  }
  const incVal = hasStart ? 1 : 0;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const filteredData = newArr.filter(
    (_, index) => index - incVal < currentMonth + 1
  );
  const filledData = new Array(12).fill(".");
  filteredData.forEach((item, index) => {
    filledData[index + incVal] = item;
  });
  if (hasStart) {
    filledData.shift();
    filledData.push(".");
  }
  return filledData.map((item) =>
    typeof item === "number" ? parseInt(item) : item
  );
};
