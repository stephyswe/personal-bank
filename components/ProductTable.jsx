import DataTable from "react-data-table-component";

import { columns } from "../utils/main/columns";

const ProductListHeader = () => (
  <div className="flex justify-between items-center w-full mb-5">
    <h3 className="font-medium text-2xl text-gray-70">Product List</h3>
  </div>
);

const ProductTable = ({ data, importExcel }) => (
  <div className="block bg-white p-10">
    <ProductListHeader />
    <div className="block">
      <label
        className="ml-3 mt-1 cursor-pointer text-gray-800 transtion-all duration-300 ease-in hover:text-blue-400"
        htmlFor="file"
        onClick={() => {
          // setButtonExport(!buttonExport);
        }}
      >
        From Excel
      </label>
      <input className="hidden" id="file" onChange={importExcel} type="file" />
    </div>

    <DataTable
      data={data}
      columns={columns}
      highlightOnHover={true}
      pointerOnHover={true}
      striped={true}
      pagination
    />
  </div>
);

export default ProductTable;
