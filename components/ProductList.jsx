import DataTable from "react-data-table-component";
import { columns } from "../utils/main/columns";

const ProductListHeader = () => (
  <div className="flex justify-between items-center w-full mb-5">
    <h3 className="font-medium text-2xl text-gray-70">Product List</h3>
  </div>
);

export const ProductList = ({ data }) => (
  <div className="block bg-white p-10">
    <ProductListHeader />
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
