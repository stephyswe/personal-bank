import * as XLSX from "xlsx";

import { CONST_FIRST_DAY_OF_YEAR } from "../const";

export const excelHeader = ["bokford", "valuta", "nummer", "text", "belopp", "saldo"];

export function getExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  let fileData = XLSX.utils.sheet_to_json(worksheet, {
    header: excelHeader,
  });

  // remove all rows before 2023-01-01 in fileData
  return fileData.splice(5).filter((item) => {
    const date = new Date(item.bokford);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date > yesterday) {
      item.saldo = "LAST";
    }
    return date >= new Date(CONST_FIRST_DAY_OF_YEAR);
  });
}
