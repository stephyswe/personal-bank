import MainProgram from "../components/mainprogram";
import Head from "next/head";

import {
  getExcel,
} from "../utils/api";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Eksport Import Excel Next JS</title>
        <meta
          name="description"
          content="Excel"
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
      data: fileData,
    },
  };
}
