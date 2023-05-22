import Head from "next/head";

import Layout from "../components/layout";
import { getExcel } from "../utils/api";

export async function getStaticProps() {
  return {
    props: {
      data: getExcel("./pages/kontoutdrag.xlsx"),
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
