import * as XLSX from "xlsx";

// Fungsi untuk mengimport data excel
export const importExcel = async (e) => {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workBook = XLSX.read(data);
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const fileData = XLSX.utils.sheet_to_json(workSheet, {
    header: ["bokford", "valuta", "nummer", "text", "belopp"],
  });
  const headers = fileData;
  const heads = headers.map((head) => ({ title: head, field: head }));
  convertToArray(headers, fileData);

  setButtonExport(false);
};
