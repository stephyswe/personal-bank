import * as XLSX from "xlsx";
import { months } from "./data";

export function objRemoveKeysDate(dataObj) {
  const combinedExpensesData2 = {};
  for (const [key, value] of Object.entries(dataObj)) {
    if (key.includes("/")) {
      const index = key.indexOf("/");
      const newKey = key.slice(0, index).trim();
      if (!combinedExpensesData2[newKey]) {
        combinedExpensesData2[newKey] = [];
      }
      combinedExpensesData2[newKey] = [
        ...combinedExpensesData2[newKey],
        ...value,
      ];
    } else {
      combinedExpensesData2[key] = value;
    }
  }
  return combinedExpensesData2;
}

export function getExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  let fileData = XLSX.utils.sheet_to_json(worksheet, {
    header: ["bokford", "valuta", "nummer", "text", "belopp", "saldo"],
  });

  // remove all rows before 2023-01-01 in fileData
  const filteredData = fileData.splice(5).filter((item) => {
    const date = new Date(item.bokford);
    if (date > new Date("2023-03-25")) {
      item.saldo = "LAST";
    }
    return date >= new Date("2023-01-01");
  });
  return filteredData;
}

// function fix it
export function handleCategories(data) {
  const beloppValues = Object.values(data).map((item) => {
    const beloppArr = months.map((month) => {
      const monthData = item.find(
        (innerItem) => innerItem.bokford.slice(5, 7) === month
      );
      if (!monthData) return ".";
      const beloppSum = item
        .filter((innerItem) => innerItem.bokford.slice(5, 7) === month)
        .reduce((sum, innerItem) => sum + innerItem.belopp, 0);
      return beloppSum;
    });
    return beloppArr.every((belopp) => belopp === ".")
      ? item.map(() => ".")
      : beloppArr;
  });

  return beloppValues;
}

export const getMonthlySums = (value) => {
  const sums = Array.from({ length: 12 }, () => 0);
  Object.values(value).forEach((item) => {
    item.forEach((innerItem) => {
      const month = Number(innerItem.bokford.slice(5, 7)) - 1;
      if (Number.isInteger(month)) sums[month] += innerItem.belopp;
    });
  });
  return sums;
};

// take two arrays and subtract the values of each index and create new array
export const subtractArrays = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (i > 0) {
      result.push(arr1[i] + arr2[i] + result[i - 1]);
    } else {
      result.push(arr1[i] + arr2[i]);
    }
  }
  return result;
};

export const filterAndFillData = (income, expenses, startVal, hasStart) => {
  let inc = getMonthlySums(income);
  inc[0] += startVal;
  const exp = getMonthlySums(expenses);
  const newArr = subtractArrays(inc, exp);
  if (hasStart) {
    newArr.unshift(18772);
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

export const sortDefault = (data) => {
  return Object.fromEntries(Object.entries(data).sort());
};

export const sortByOrder = (data, order) => {
  return Object.fromEntries(
    Object.entries(data).sort(
      ([keyA], [keyB]) => order.indexOf(keyA) - order.indexOf(keyB)
    )
  );
};

export const groupByBelopp = (data, isPositive) => {
  const result = {};

  const filterFunc = isPositive
    ? (item) => item.belopp > 0
    : (item) => item.belopp < 0;

  for (const item of data.filter(filterFunc)) {
    const key = item.text;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
};

export function objCat(data, objectKeys) {
  const newData = {};
  for (const [key, value] of Object.entries(data)) {
    const matchedKey = Object.keys(objectKeys).find((objKey) =>
      objectKeys[objKey].includes(key)
    );
    if (matchedKey) {
      if (!newData[matchedKey]) {
        newData[matchedKey] = [];
      }
      newData[matchedKey] = [...newData[matchedKey], ...value];
    }
  }
  return newData;
}

export function objCatWithKeys(data, objectKeys) {
  const combinedCategories = {};
  for (const [key, value] of Object.entries(data)) {
    const matchedKey = Object.keys(objectKeys).find((objKey) =>
      objectKeys[objKey].includes(key)
    );
    if (matchedKey) {
      if (!combinedCategories[matchedKey]) {
        combinedCategories[matchedKey] = [];
      }
      combinedCategories[matchedKey] = [
        ...combinedCategories[matchedKey],
        ...value,
      ];
    } else {
      combinedCategories[key] = value;
    }
  }
  return combinedCategories;
}
