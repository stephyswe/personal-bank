import MainProgram from "../components/mainprogram";
import Head from "next/head";
import * as XLSX from "xlsx";

export default function Home({ data }) {
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
      <MainProgram data={data} />
    </>
  );
}

/* export async function getServerSideProps() {} */

// Fungsi untuk mengambil data dari api
export async function getStaticProps() {
  /* excel */
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
        incomeBetter: objInc,
        expSolidCat: handleCategories(permExpense),
        expCustomCat: handleCategories(customExpense),
        permExpense,
        customExpense,
        expAllCat: handleCategories(sortedData),
        expAll: sortedData,
        expAllNew: objExp,
      },
    },
  };
}

function getExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  let fileData = XLSX.utils.sheet_to_json(worksheet, {
    header: ["bokford", "valuta", "nummer", "text", "belopp", "saldo"],
  });

  // remove all rows before 2023-01-01 in fileData
  const filteredData = fileData.splice(5).filter((item) => {
    const date = new Date(item.bokford);
    if (date > new Date("2023-03-25")) {
      item.saldo = "LAST";
    }
    return date >= new Date("2023-01-01");
  });
  return filteredData;
}

// function fix it
function handleCategories(data) {
  const beloppValues = Object.values(data).map((item) => {
    const beloppArr = months.map((month) => {
      const monthData = item.find(
        (innerItem) => innerItem.bokford.slice(5, 7) === month
      );
      if (!monthData) return ".";
      const beloppSum = item
        .filter((innerItem) => innerItem.bokford.slice(5, 7) === month)
        .reduce((sum, innerItem) => sum + innerItem.belopp, 0);
      return beloppSum;
    });
    return beloppArr.every((belopp) => belopp === ".")
      ? item.map(() => ".")
      : beloppArr;
  });

  return beloppValues;
}

const getMonthlySums = (value) => {
  const sums = Array.from({ length: 12 }, () => 0);
  Object.values(value).forEach((item) => {
    item.forEach((innerItem) => {
      const month = Number(innerItem.bokford.slice(5, 7)) - 1;
      if (Number.isInteger(month)) sums[month] += innerItem.belopp;
    });
  });
  return sums;
};

// take two arrays and subtract the values of each index and create new array
const subtractArrays = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (i > 0) {
      result.push(arr1[i] + arr2[i] + result[i - 1]);
    } else {
      result.push(arr1[i] + arr2[i]);
    }
  }
  return result;
};

const filterAndFillData = (income, expenses, startVal, hasStart) => {
  let inc = getMonthlySums(income);
  inc[0] += startVal;
  const exp = getMonthlySums(expenses);
  const newArr = subtractArrays(inc, exp);
  if (hasStart) {
    newArr.unshift(18772);
  }
  const incVal = hasStart ? 1 : 0;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const filteredData = newArr.filter(
    (_, index) => index - incVal < currentMonth + 1
  );
  const filledData = new Array(12).fill(".");
  filteredData.forEach((item, index) => {
    filledData[index + incVal] = item;
  });
  if (hasStart) {
    filledData.shift();
    filledData.push(".");
  }
  return filledData.map((item) =>
    typeof item === "number" ? parseInt(item) : item
  );
};

const sortDefault = (data) => {
  return Object.fromEntries(Object.entries(data).sort());
};

const sortByOrder = (data, order) => {
  return Object.fromEntries(
    Object.entries(data).sort(
      ([keyA], [keyB]) => order.indexOf(keyA) - order.indexOf(keyB)
    )
  );
};

const groupByBelopp = (data, isPositive) => {
  const result = {};

  const filterFunc = isPositive
    ? (item) => item.belopp > 0
    : (item) => item.belopp < 0;

  for (const item of data.filter(filterFunc)) {
    const key = item.text;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
};

function objCat(data, objectKeys) {
  const newData = {};
  for (const [key, value] of Object.entries(data)) {
    const matchedKey = Object.keys(objectKeys).find((objKey) =>
      objectKeys[objKey].includes(key)
    );
    if (matchedKey) {
      if (!newData[matchedKey]) {
        newData[matchedKey] = [];
      }
      newData[matchedKey] = [...newData[matchedKey], ...value];
    }
  }
  return newData;
}

function objCatWithKeys(data, objectKeys) {
  const combinedCategories = {};
  for (const [key, value] of Object.entries(data)) {
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
  return combinedCategories;
}

export function objRemoveKeysDate(dataObj) {
  const combinedExpensesData2 = {};
  for (const [key, value] of Object.entries(dataObj)) {
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
  return combinedExpensesData2;
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

const objectKeys = { ...objectPermExpense, ...objectCustomExpense };

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const headersTop = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
export const headersYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];
