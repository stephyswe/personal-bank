import {
  filterAndFillData,
  getMonthlySums,
  groupByBelopp,
  handleCategories,
  objCat,
  objCatWithKeys,
  objRemoveKeysDate,
  sortByOrder,
  sortDefault,
} from "./api";
import { CONST_BUDGET_START_VALUE } from "./const";
import {
  customOrder,
  objectCustomExpense,
  objectKeys,
  objectPermExpense,
} from "./data";

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

  const getData = {
    fileData,
    incAtStart: filterAndFillData(
      objInc,
      objExp,
      CONST_BUDGET_START_VALUE,
      true
    ),
    expCustom: getMonthlySums(customExpense),
    expSolid: getMonthlySums(permExpense),
    incTotal: getMonthlySums(objInc),
    expTotal: getMonthlySums(objExp),
    total: filterAndFillData(objInc, objExp, CONST_BUDGET_START_VALUE),
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
