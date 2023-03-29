import MainProgram from "../components/mainprogram";
import Head from "next/head";

import {
  customOrder,
  objectCustomExpense,
  objectKeys,
  objectPermExpense,
} from "../utils/data";
import {
  filterAndFillData,
  getExcel,
  getMonthlySums,
  groupByBelopp,
  handleCategories,
  objCat,
  objCatWithKeys,
  objRemoveKeysDate,
  sortByOrder,
  sortDefault,
} from "../utils/api";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Eksport Import Excel Next JS</title>
        <meta
          name="description"
          content="Latihan menggunakan NextJS untuk eksport dan import data dengan Excel"
        />
      </Head>
      <MainProgram data={data} />
    </>
  );
}

export async function getStaticProps() {
  var fileData = getExcel("./pages/kontoutdrag.xlsx");

  const objInc = groupByBelopp(fileData, true);
  const objExp = sortDefault(groupByBelopp(fileData, false));
  const objCombExp = objRemoveKeysDate(objExp);
  const sortedData = sortByOrder(
    objCatWithKeys(objCombExp, objectKeys),
    customOrder
  );
  const permExpense = objCat(objCombExp, objectPermExpense);
  const customExpense = objCat(objCombExp, objectCustomExpense);

  return {
    props: {
      data: {
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
      },
    },
  };
}
