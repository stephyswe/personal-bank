import { useEffect, useState } from "react";

import { convertData } from "../utils/common";
import { changeDate } from "../utils/layout/changeDate";
import { ProductList } from "./ProductList";
import { Navbar } from "./navbar";
import { TabContainer } from "./TabContainer";

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
        <TabContainer onButtonClick={onClick} data={data} />
        <ProductList data={tableData} />
      </div>
    </div>
  );
};

export default Layout;
