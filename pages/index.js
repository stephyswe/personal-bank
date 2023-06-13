import fs from "fs";
import { join } from "path";
import Head from "next/head";

import { getExcel } from "../utils/api/getExcel";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const filePath = join(process.cwd(), "kontoutdrag.xlsx");
  const data = fs.existsSync(filePath) ? getExcel(filePath) : [];

  return {
    props: {
      data,
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
