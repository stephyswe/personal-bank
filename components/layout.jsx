import { useEffect, useState } from "react";

import { convertData } from "../utils/common";
import { changeDate } from "../utils/layout/changeDate";
import { ProductList } from "./ProductList";
import { TabList } from "./TabList";
import { Navbar } from "./navbar";

const TabContainer = ({ onButtonClick, data }) => (
  <div className="block bg-white p-10 mb-5">
    <div className="flex justify-between items-center w-full mb-5">
      <h3 className="font-medium text-2xl text-gray-70">Tab List</h3>
    </div>
    <button onClick={() => onButtonClick()}>Change</button>
    <TabList data={data} />
  </div>
);

const Layout = ({
  newData,
  tableData,
  showModal,
  columns,
  buttonExport,
  importExcel,
}) => {
  const [initData, setInitData] = useState(newData);
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
        <ProductList
          data={tableData}
          showModal={showModal}
          buttonExport={buttonExport}
          columns={columns}
          importExcel={importExcel}
        />
      </div>
    </div>
  );
};

export default Layout;
