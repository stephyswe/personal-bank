import React, { useEffect, useState } from "react";
import Layout from "./layout";
import * as XLSX from "xlsx";

// Untuk membuat kolom pada datatable
const columns = [
  {
    name: "Bokford",
    selector: (row) => row.bokford,
    sortable: true,
  },
  {
    name: "Valuta",
    selector: (row) => row.valuta,
    sortable: true,
  },
  {
    name: "Nummer",
    selector: (row) => row.nummer,
    sortable: true,
  },
  {
    name: "Text",
    selector: (row) => row.text,
    sortable: true,
  },
  {
    name: "Belopp",
    selector: (row) => row.belopp,
    sortable: true,
  },
  {
    name: "Saldo",
    selector: (row) => row.saldo,
    // selector: (row) => `Rp. ${(row.price * 15000).toLocaleString("id-ID")}`,
    sortable: true,
  },
];

const MainProgram = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [buttonExport, setButtonExport] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTableData(data.fileData);
  }, [data.fileData]);

  // Mengubah data dari excel menjadi array
  const convertToArray = (data) => {
    // remove first 7 row in data array
    data.splice(0, 5);
    setTableData(data);
    setShowModal(!showModal);
  };
  // Cek apabila datanya tidak ada
  if (!tableData) return null;

  // Fungsi untuk menampilkan data dari api
  const apiData = (data) => {
    const product = data.products;
    setTableData(product);
    setButtonExport(true);
    setShowModal(!showModal);
  };

  // Fungsi untuk mengimport data excel
  const importExcel = async (e) => {
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

  // Fungsi untuk mengexport data kedalam excel
  const exportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  // Untuk menampilkan data kedalam datatable
  return (
    <Layout
      tableData={tableData}
      showModal={showModal}
      setShowModal={setShowModal}
      columns={columns}
      apiData={apiData}
      importExcel={importExcel}
      exportExcel={exportExcel}
      buttonExport={buttonExport}
      setButtonExport={setButtonExport}
      data={data}
    />
  );
};

export default MainProgram;
