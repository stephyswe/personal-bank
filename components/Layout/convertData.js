import { getMonthlySums } from "../../utils/api/getMonthlySums";
import { groupByBelopp } from "../../utils/api/groupByBelopp";
import { handleCategories } from "../../utils/api/handleCategories";
import { objCat } from "../../utils/api/objCat";
import { objCatWithKeys } from "../../utils/api/objCatWithKeys";
import { objRemoveKeysDate } from "../../utils/api/objRemoveKeysDate";
import { sortByOrder } from "../../utils/api/sortByOrder";
import { sortDefault } from "../../utils/api/sortDefault";
import { filterAndFillData } from "../../utils/filterAndFillData";

import { CONST_BUDGET_START_VALUE } from "../../utils/const";

import { customOrder } from "../../utils/data/customOrder";
import { objectPermExpense } from "../../utils/data/objectPermExpense";
import { objectCustomExpense } from "../../utils/data/objectCustomExpense";
import { objectKeysAll } from "../../utils/data/objectKeysAll";

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
