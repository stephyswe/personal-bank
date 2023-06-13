import { getMonthlySums } from "../api/getMonthlySums";
import { groupByBelopp } from "../api/groupByBelopp";
import { handleCategories } from "../api/handleCategories";
import { objCat } from "../api/objCat";
import { objCatWithKeys } from "../api/objCatWithKeys";
import { objRemoveKeysDate } from "../api/objRemoveKeysDate";
import { sortByOrder } from "../api/sortByOrder";
import { sortDefault } from "../api/sortDefault";
import { filterAndFillData } from "../filterAndFillData";

import { CONST_BUDGET_START_VALUE } from "../const";

import { customOrder } from "../data/customOrder";
import { objectPermExpense } from "../data/objectPermExpense";
import { objectCustomExpense } from "../data/objectCustomExpense";
import { objectKeysAll } from "../data/objectKeysAll";

export function convertData(fileData, setData) {
  const objInc = groupByBelopp(fileData, true);
  const objExp = sortDefault(groupByBelopp(fileData, false));
  const objCombExp = objRemoveKeysDate(objExp);
  const sortedData = sortByOrder(
    objCatWithKeys(objCombExp, objectKeysAll),
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
