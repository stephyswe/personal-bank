import Head from "next/head";

import { getExcel } from "../utils/api/getExcel";
import Layout from "../components/Layout";

export async function getStaticProps() {
  return {
    props: {
      // data: getExcel("./pages/kontoutdrag.xlsx")
      data: [],
    },
  };
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Eksport Import Excel Next JS</title>
        <meta name="description" content="Excel" />
      </Head>
      <Layout tableData={data} />
    </>
  );
}
