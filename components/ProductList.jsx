import DataTable from "react-data-table-component";

const ProdList = ({ data, showModal, buttonExport }) => {
  return (
    <div className="flex justify-between items-center w-full mb-5">
      <h3 className="font-medium text-2xl text-gray-70">Product List</h3>
      <div className="relative flex gap-3 items-center">
        {data.length > 0 && buttonExport ? (
          <button
            className="px-10 py-3 bg-purple-500 text-white outline-none font-semibold shadow-lg shadow-purple-300 hover:shadow-none transition duration-300 ease-linear"
            onClick={() => exportExcel(data)}
          >
            Eksport CSV
          </button>
        ) : (
          <></>
        )}
        <button
          className="px-10 py-3 border relative border-blue-500 text-blue-500"
          onClick={() => setShowModal(true)}
        >
          Select Data
          {showModal ? (
            <div className="flex flex-col gap-2 items-start absolute right-0 top-full w-[200px] p-3 bg-white z-10 rounded-md shadow-lg border border-gray-300 transition-all duration-500 ease-in mt-3">
              <a
                className="ml-3 mt-1 cursor-pointer text-gray-800 transtion-all duration-300 ease-in hover:text-blue-400"
                onClick={() => {
                  apiData(data);
                }}
              >
                From Api
              </a>
              <div className="block">
                <label
                  className="ml-3 mt-1 cursor-pointer text-gray-800 transtion-all duration-300 ease-in hover:text-blue-400"
                  htmlFor="file"
                  onClick={() => {
                    setButtonExport(!buttonExport);
                  }}
                >
                  From Excel
                </label>
                <input
                  className="hidden"
                  id="file"
                  onChange={importExcel}
                  type="file"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};

export function ProductList({
  data,
  showModal,
  buttonExport,
  columns,
  importExcel,
}) {
  return (
    <div className="block bg-white p-10">
      <ProdList
        data={data}
        showModal={showModal}
        buttonExport={buttonExport}
        importExcel={importExcel}
      />
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
}
