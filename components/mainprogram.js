import React, { useEffect, useState } from "react";

import Layout from "./layout";
import { exportExcel } from "../utils/main/exportExcel";
import { importExcel } from "../utils/main/importExcel";
import { apiData } from "../utils/main/apiData";
import { columns } from "../utils/main/columns";

const MainProgram = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [buttonExport, setButtonExport] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  if (!tableData) return null;

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
      newData={data}
    />
  );
};

export default MainProgram;
