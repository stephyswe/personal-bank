import { filterAndFillData, getMonthlySums, groupByBelopp, handleCategories, objCat, objCatWithKeys, objRemoveKeysDate, sortByOrder, sortDefault } from "./api";
import { customOrder, months, objectCustomExpense, objectKeys, objectPermExpense } from "./data";

export const beloppValues = (data) => {
  return Object.values(data).map((item) => {
    const beloppArr = months.map((month) => {
      const monthData = item.find(
        (innerItem) => innerItem.bokford.slice(5, 7) === month
      );
      return monthData ? monthData.belopp : ".";
    });
    return beloppArr.every((belopp) => belopp === ".")
      ? item.map(() => ".")
      : beloppArr;
  });
};

export function objWithKeys(data) {
  return data.reduce((acc, obj) => {
    const key = obj.text;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function convertData(fileData, setData) {
  const objInc = groupByBelopp(fileData, true);
  const objExp = sortDefault(groupByBelopp(fileData, false));
  const objCombExp = objRemoveKeysDate(objExp);
  const sortedData = sortByOrder(
    objCatWithKeys(objCombExp, objectKeys),
    customOrder
  );
  const permExpense = objCat(objCombExp, objectPermExpense);
  const customExpense = objCat(objCombExp, objectCustomExpense);

  // change to a State.

  const getData = {
    fileData,
    incAtStart: filterAndFillData(objInc, objExp, 18772, true),
    expCustom: getMonthlySums(customExpense),
    expSolid: getMonthlySums(permExpense),
    incTotal: getMonthlySums(objInc),
    expTotal: getMonthlySums(objExp),
    total: filterAndFillData(objInc, objExp, 18772),
    expSolidCat: handleCategories(permExpense),
    expCustomCat: handleCategories(customExpense),
    permExpense,
    customExpense,
    expAllCat: handleCategories(sortedData),
    expAll: sortedData,
    incomeBetter: objInc,
    expAllNew: objExp,
  };
  setData(getData);
}
