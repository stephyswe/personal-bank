import * as XLSX from "xlsx";
import cloneDeep from "lodash/cloneDeep";

import { CONST_FIRST_DAY_OF_YEAR } from "../const";

export const excelHeader = [
  "bokford",
  "valuta",
  "nummer",
  "text",
  "belopp",
  "saldo",
];

export function getExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  let fileData = XLSX.utils.sheet_to_json(worksheet, {
    header: excelHeader,
  });

  // remove all rows before 2023-01-01 in fileData
  fileData = fileData.splice(5).filter((item) => {
    const date = new Date(item.bokford);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date > yesterday) {
      item.saldo = "LAST";
    }
    return date >= new Date(CONST_FIRST_DAY_OF_YEAR);
  });

  // Perform deep copy of fileData to eliminate non-serializable properties
  return cloneDeep(fileData);
}
