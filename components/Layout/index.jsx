import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { Navbar } from "../navbar";
import { convertData } from "./convertData";

import { changeDate } from "../../utils/layout/changeDate";

import ProductTable from "../ProductTable";
import EconomyContainer from "../Economy/Container";
import { excelHeader } from "../../utils/api/getExcel";

const Layout = ({ tableData }) => {
  const [isClick, setIsClick] = useState(false);
  const [initData, setInitData] = useState(tableData);
  const [data, setData] = useState(null);

  const convertToArray = (data) => {
    setInitData(data);
  };

  const importExcel = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const bstr = e.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const fileData = XLSX.utils.sheet_to_json(worksheet, {
        header: excelHeader,
      });

      // Process the fileData as needed
      const newData = fileData.splice(5).filter((item) => {
        const date = new Date(item.bokford);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date > yesterday) {
          item.saldo = "LAST";
        }
        return date >= new Date("2023-01-01");
      });

      convertToArray(newData);
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    convertData(changeDate(initData), setData);
  }, [initData]);

  const onClick = () => {
    if (isClick) convertData(changeDate(initData), setData);
    else {
      convertData(initData, setData);
    }
    setIsClick(!isClick);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-gray-300 min-h-screen h-full">
      <div className="py-20 px-[200px]">
        <Navbar />
        <EconomyContainer
          onButtonClick={onClick}
          data={data}
          isClick={isClick}
        />
        <ProductTable data={initData} importExcel={importExcel} />
      </div>
    </div>
  );
};

export default Layout;
