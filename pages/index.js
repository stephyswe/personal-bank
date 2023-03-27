import MainProgram from "../components/mainprogram";
import Head from "next/head";
import * as XLSX from "xlsx";

export default function Home({ data, moreData }) {
  // Komponen Utama
  return (
    <>
      <Head>
        <title>Eksport Import Excel Next JS</title>
        <meta
          name="description"
          content="Latihan menggunakan NextJS untuk eksport dan import data dengan Excel"
        />
      </Head>
      <MainProgram data={data} moreData={moreData} />
    </>
  );
}

/* export async function getServerSideProps() {} */

// Fungsi untuk mengambil data dari api
export async function getStaticProps() {
  /* excel */

  const workbook = XLSX.readFile("./pages/kontoutdrag.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  let fileData = XLSX.utils.sheet_to_json(worksheet, {
    header: ["bokford", "valuta", "nummer", "text", "belopp"],
  });

  // remove first 5 rows in data array
  fileData = fileData.splice(5, fileData.length - 1);

  // make before here.
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-31");

  const filteredData = fileData.filter((item) => {
    const date = new Date(item.bokford);
    return date >= startDate && date <= endDate;
  });

  const objectIncome = {};
  const objectExpense = {};

  for (const item of filteredData.filter((item) => item.belopp > 0)) {
    const key = item.text;
    if (!objectIncome[key]) {
      objectIncome[key] = [];
    }
    objectIncome[key].push(item);
  }

  for (const item of filteredData.filter((item) => item.belopp < 0)) {
    const key = item.text;
    if (!objectExpense[key]) {
      objectExpense[key] = [];
    }
    objectExpense[key].push(item);
  }

  const sortedExpensesData = Object.fromEntries(
    Object.entries(objectExpense).sort()
  );

  // combine all objectExpense that has key  "WILLYS GOTEB/23-01-11", "WILLYS GOTEB/23-01-16", "WILLYS GOTEB/23-03-25" into one key "WILLYS"
  const combinedExpensesData = {};
  for (const [key, value] of Object.entries(sortedExpensesData)) {
    if (key.includes("WILLYS")) {
      if (!combinedExpensesData["WILLYS"]) {
        combinedExpensesData["WILLYS"] = [];
      }
      combinedExpensesData["WILLYS"] = [
        ...combinedExpensesData["WILLYS"],
        ...value,
      ];
    } else {
      combinedExpensesData[key] = value;
    }
  }

  // combine all objectExpense that has key with "/YY-MM-DD" into one key based on the first 5 characters
  const combinedExpensesData2 = {};
  for (const [key, value] of Object.entries(combinedExpensesData)) {
    if (key.includes("/")) {
      const newKey = key.slice(0, 6);
      if (!combinedExpensesData2[newKey]) {
        combinedExpensesData2[newKey] = [];
      }
      combinedExpensesData2[newKey] = [
        ...combinedExpensesData2[newKey],
        ...value,
      ];
    } else {
      combinedExpensesData2[key] = value;
    }
  }

  const objectKeys = {
    Mat: ["WILLYS", "LIDL"],
  };

  // combine from combinedExpensesData2 into objectKeys
  const combinedCategories = {};
  for (const [key, value] of Object.entries(combinedExpensesData2)) {
    if (objectKeys.Mat.includes(key)) {
      if (!combinedCategories["Mat"]) {
        combinedCategories["Mat"] = [];
      }
      combinedCategories["Mat"] = [...combinedCategories["Mat"], ...value];
    } else {
      combinedCategories[key] = value;
    }
  }

  console.log("combinedCategories", combinedCategories);

  return {
    props: {
      moreData: {
        income: objectIncome,
        expense: sortedExpensesData,
        expenseMat: combinedExpensesData,
        expenseCat: combinedExpensesData2,
        expenseCat2: combinedCategories,
      },
      data: fileData,
    },
  };

  const api = await fetch("https://dummyjson.com/products?limit=100");
  const data = await api.json();
  return { props: { data } };
}
