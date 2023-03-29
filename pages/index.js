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
  const fileData = getExcel("./pages/kontoutdrag.xlsx");

  return {
    props: {
      data: {
        fileData,
      },
    },
  };
}
