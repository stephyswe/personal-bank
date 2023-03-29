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
    header: ["bokford", "valuta", "nummer", "text", "belopp", "saldo"],
  });

  // remove first 5 rows in data array
  fileData = fileData.splice(5, fileData.length - 1);

  // remove all rows before 2023-01-01 in fileData
  fileData = fileData.filter((item) => {
    const date = new Date(item.bokford);
    return date >= new Date("2023-01-01");
  });

  // make before here.
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-31");

  const filteredData = fileData.filter((item) => {
    const date = new Date(item.bokford);

    if (date > new Date("2023-03-25")) {
      item.saldo = "LAST";
    }
    return date >= startDate && date <= endDate;
  });

  console.log(
    "filteredData",
    filteredData.filter((item) => {
      const date = new Date(item.bokford);
      return date >= new Date("2023-03-25") && date <= new Date("2023-03-31");
    })
  );

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

  // combine all objectExpense that has key with "/YY-MM-DD" into one key based on the first 5 characters
  const combinedExpensesData2 = {};
  for (const [key, value] of Object.entries(sortedExpensesData)) {
    if (key.includes("/")) {
      const index = key.indexOf("/");
      const newKey = key.slice(0, index).trim();
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
    Okänd: ["1232900371", "1233199221", "1236218176", "1236417380"],
    Räkning: ["VISMA FINANCIAL SOLUTION"],
    Hälsa: ["APOTEKET AB", "REGIONSERVICE PATIENTFAK"],
    Nöje: [
      "AMAZONRETAIL",
      "K*SPELBUTIKE",
      "RIOT  AE3N32",
      "RIOT  AE35HZ",
      "HAGABIONS CA",
      "KJELL & CO 1",
      "KJELL & CO 3",
    ],
    Present: ["DESIGNTORGET"],
    Övrigt: [
      "SAN FR",
      "DUBLIN",
      "DELABO",
      "VÄSTRA GÖTAL",
      "BJORKAFRIHET",
      "BILLOGRAM",
      "WH GOTEBORG",
      "SAN FRANSICO",
      "SAN FRANCISC",
      "WH GOTEBORG ",
      "GÖTEBORGS UN",
      "K*ETSY.COM",
      "EC STATIONS",
      "AKADEMIBOKHA",
    ],
    SEB_Enkla: ["ENKLA VARDAG"],
    Hemförsäkring: ["IF SKADEFÖRS"],
    Hyra: ["HSB MÖLNDAL EK. FÖR."],
    LÅN_MoneyGo: ["MONEYGO AB"],
    LÅN_SEB: ["LÅNEOMS"],
    Resor: ["VÄSTTRAFIK A", "VASTTRAFIK T"],
    Träning: ["NORDICWELL", "SPORTLIFE M", "FTC MOLNDAL"],
    El: ["MÖLNDAL ENERGI AB"],
    Telefon: ["TELENOR", "VIMLA"],
    Mat: [
      "WILLYS GOTEB",
      "WILLYS HEMMA",
      "WILLY:S AB",
      "LIDL 346",
      "HEMKOP",
      "HEMKOP GOTEG",
      "HEMKOP TROLL",
      "NYTTIG",
    ],
    Utemat: [
      "FLODAJERNVEG",
      "LILLA TOKYO",
      "KROKSLATTS L",
      "KROKSLATTS S",
      "SALTES RESTA",
      "7-ELEVEN GBG",
      "7ELEVEN GBG",
      "4415193 7-EL",
      "4128113 PRES",
      "4028150 PRES",
      "LE SUSHIBAR ",
      "ESPRESSO H 2",
      "K*FOODORA AB",
      "NYTTIG SNABB",
      "PIZZA 4 YOU",
      "ONEFOOD",
      "OAKVILLE",
      "NW GOTEBORG",
      "LE SUSHIBAR",
      "DELABOLE",
    ],
    Abonnemang: ["FRISKTANDV", "GOTEBORGS-PO", "UNIONEN", "UNION.AKASSA"],
  };

  // combine from combinedExpensesData2 into objectKeys as combinedCategories
  const combinedCategories = {};
  for (const [key, value] of Object.entries(combinedExpensesData2)) {
    const matchedKey = Object.keys(objectKeys).find((objKey) =>
      objectKeys[objKey].includes(key)
    );
    if (matchedKey) {
      if (!combinedCategories[matchedKey]) {
        combinedCategories[matchedKey] = [];
      }
      combinedCategories[matchedKey] = [
        ...combinedCategories[matchedKey],
        ...value,
      ];
    } else {
      combinedCategories[key] = value;
    }
  }

  const customOrder = [
    "Telefon",
    "El",
    "Hemförsäkring",
    "Hyra",
    "LÅN_MoneyGo",
    "LÅN_SEB",
    "Utemat",
    "Mat",
    "Nöje",
    "Resor",
    "Träning",
    "Övrigt",
    "SEB_Enkla",
    "Abonnemang",
    "d",
    "b",
    "e",
  ];

  const sortedData = Object.fromEntries(
    Object.entries(combinedCategories).sort(
      ([keyA], [keyB]) => customOrder.indexOf(keyA) - customOrder.indexOf(keyB)
    )
  );

  const objectPermExpense = {
    Hyra: ["HSB MÖLNDAL EK. FÖR."],
    SEB_Enkla: ["ENKLA VARDAG"],
    Hemförsäkring: ["IF SKADEFÖRS"],
    LÅN_MoneyGo: ["MONEYGO AB"],
    LÅN_SEB: ["LÅNEOMS"],
    El: ["MÖLNDAL ENERGI AB"],
    Telefon: ["TELENOR", "VIMLA"],
    Abonnemang: ["FRISKTANDV", "GOTEBORGS-PO", "UNIONEN", "UNION.AKASSA"],
  };

  // only add objectPermExpense from combinedCategories into objectPermExpense
  const permExpense = {};
  for (const [key, value] of Object.entries(combinedExpensesData2)) {
    const matchedKey = Object.keys(objectPermExpense).find((objKey) =>
      objectPermExpense[objKey].includes(key)
    );
    if (matchedKey) {
      if (!permExpense[matchedKey]) {
        permExpense[matchedKey] = [];
      }
      permExpense[matchedKey] = [...permExpense[matchedKey], ...value];
    }
  }

  const objectCustomExpense = {
    Okänd: ["1232900371", "1233199221", "1236218176", "1236417380"],
    Räkning: ["VISMA FINANCIAL SOLUTION"],
    Hälsa: ["APOTEKET AB", "REGIONSERVICE PATIENTFAK"],
    Nöje: [
      "AMAZONRETAIL",
      "K*SPELBUTIKE",
      "RIOT  AE3N32",
      "RIOT  AE35HZ",
      "HAGABIONS CA",
      "KJELL & CO 1",
      "KJELL & CO 3",
    ],
    Present: ["DESIGNTORGET"],
    Resor: ["VÄSTTRAFIK A", "VASTTRAFIK T"],
    Träning: ["NORDICWELL", "SPORTLIFE M", "FTC MOLNDAL"],
    Övrigt: [
      "SAN FR",
      "DUBLIN",
      "DELABO",
      "VÄSTRA GÖTAL",
      "BJORKAFRIHET",
      "BILLOGRAM",
      "WH GOTEBORG",
      "SAN FRANSICO",
      "SAN FRANCISC",
      "WH GOTEBORG ",
      "GÖTEBORGS UN",
      "K*ETSY.COM",
      "EC STATIONS",
      "AKADEMIBOKHA",
    ],
    Mat: [
      "WILLYS GOTEB",
      "WILLYS HEMMA",
      "WILLY:S AB",
      "LIDL 346",
      "HEMKOP",
      "HEMKOP GOTEG",
      "HEMKOP TROLL",
      "NYTTIG",
    ],
    Utemat: [
      "FLODAJERNVEG",
      "LILLA TOKYO",
      "KROKSLATTS L",
      "KROKSLATTS S",
      "SALTES RESTA",
      "7-ELEVEN GBG",
      "7ELEVEN GBG",
      "4415193 7-EL",
      "4128113 PRES",
      "4028150 PRES",
      "LE SUSHIBAR ",
      "ESPRESSO H 2",
      "K*FOODORA AB",
      "NYTTIG SNABB",
      "PIZZA 4 YOU",
      "ONEFOOD",
      "OAKVILLE",
      "NW GOTEBORG",
      "LE SUSHIBAR",
      "DELABOLE",
    ],
  };

  const customExpense = {};
  for (const [key, value] of Object.entries(combinedExpensesData2)) {
    const matchedKey = Object.keys(objectCustomExpense).find((objKey) =>
      objectCustomExpense[objKey].includes(key)
    );
    if (matchedKey) {
      if (!customExpense[matchedKey]) {
        customExpense[matchedKey] = [];
      }
      customExpense[matchedKey] = [...customExpense[matchedKey], ...value];
    }
  }

  return {
    props: {
      moreData: {
        income: objectIncome,
        expense: sortedExpensesData,
        expenseCat: combinedExpensesData2,
        expenseCat2: sortedData,
        permExpense: permExpense,
        customExpense: customExpense,
      },
      data: fileData,
    },
  };
}
