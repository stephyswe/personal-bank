import { useEffect, useState } from "react";

import { Navbar } from "../navbar";
import { convertData } from "./convertData";

import { changeDate } from "../../utils/layout/changeDate";

import ProductTable from "../ProductTable";
import EconomyContainer from "../Economy/Container";

const Layout = ({ tableData }) => {
  const [initData, setInitData] = useState(tableData);
  const [data, setData] = useState(null);

  useEffect(() => {
    convertData(initData, setData);
  }, [initData]);

  const onClick = () => {
    convertData(changeDate(initData), setData);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-gray-300 min-h-screen h-full">
      <div className="py-20 px-[200px]">
        <Navbar />
        <EconomyContainer onButtonClick={onClick} data={data} />
        <ProductTable data={tableData} />
      </div>
    </div>
  );
};

export default Layout;
