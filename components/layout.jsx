import { useState } from "react";
import DataTable from "react-data-table-component";
import { headersTop, headersYear, objRemoveKeysDate } from "../pages";

const Layout = ({
  data: {
    incAtStart,
    expCustom,
    expSolid,
    incTotal,
    expTotal,
    total,
    incomeBetter,
    expSolidCat,
    expCustomCat,
    permExpense,
    customExpense,
    expAllCat,
    expAll,
    expAllNew,
  },
  tableData,
  showModal,
  setShowModal,
  columns,
  importExcel,
  exportExcel,
  apiData,
  buttonExport,
  setButtonExport,
}) => {
  // Komponen datatable
  return (
    <div className="bg-gray-300 min-h-screen h-full">
      <div className="py-20 px-[200px]">
        <div className="mb-5 bg-white p-5 flex justify-between items-center">
          <h3 className="font-medium text-gray-700 text-md">
            Program Export & Import Data Excel Dengan Menggunakan Next JS
          </h3>
          <a
            href="https://adeyusuf.site"
            target="_blank"
            className="text-blue-500"
            rel="noreferrer"
          >
            Created By &copy; Ade Yusuf
          </a>
        </div>

        <div className="block bg-white p-10 mb-5">
          <div className="flex justify-between items-center w-full mb-5">
            <h3 className="font-medium text-2xl text-gray-70">Tab List</h3>
          </div>
          <table>
            <thead>
              <CellTop />
            </thead>
            <tbody>
              <CellYear id="Sammanställning" />
              <DataCell
                id="Kassa i början"
                data={incAtStart}
                renderAsIntegers={true}
              />
              <CellNew />
              <DataCell id="Utbetalningar - Fasta" data={expSolid} />
              <DataCell id="Utbetalningar - Spridda" data={expCustom} />
              <CellNew />
              <DataCell id="Månadens inbetalningar" data={incTotal} />
              <DataCell id="Månadens utbetalningar" data={expTotal} />
              <DataCell
                id="Kassa i slutet"
                data={total}
                renderAsIntegers={true}
              />
              <CellNew />
              <CellNew />
              <CellYear id="Inbetalningar" />
              <DataComponent data={incomeBetter} />
              <CellNew />
              <CellYear id="Fasta utgifter" />
              <DataCatCell data={permExpense} dataCat={expSolidCat} />
              <CellNew />
              <CellYear id="Spridda utgifter" />
              <DataCatCell data={customExpense} dataCat={expCustomCat} />
              <CellNew />
              <CellYear id="Utbetalningar (Kategorier)" />
              <DataCatCell data={expAll} dataCat={expAllCat} />

              <CellNew />
              <CellYear id="Utbetalningar" />
              <DataComponent data={expAllNew} />
            </tbody>
          </table>
        </div>

        <div className="block bg-white p-10">
          <ProdList
            tableData={tableData}
            showModal={showModal}
            buttonExport={buttonExport}
          />
          <DataTable
            data={tableData}
            columns={columns}
            highlightOnHover={true}
            pointerOnHover={true}
            striped={true}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

const TableHeaderRow = ({ headers }) => (
  <tr>
    {headers.map((header, index) => (
      <th key={index}>{header}</th>
    ))}
  </tr>
);

const TableDataRow = ({ id, data }) => (
  <tr>
    <td className="text-left">{id}</td>
    {data.map((datum, index) => (
      <td key={index}>{datum}</td>
    ))}
  </tr>
);

const CellTop = () => <TableHeaderRow headers={headersTop} />;
const CellYear = ({ id }) => <TableDataRow id={id} data={headersYear} />;

const ProdList = ({ tableData, showModal, buttonExport }) => {
  return (
    <div className="flex justify-between items-center w-full mb-5">
      <h3 className="font-medium text-2xl text-gray-70">Product List</h3>
      <div className="relative flex gap-3 items-center">
        {tableData.length > 0 && buttonExport ? (
          <button
            className="px-10 py-3 bg-purple-500 text-white outline-none font-semibold shadow-lg shadow-purple-300 hover:shadow-none transition duration-300 ease-linear"
            onClick={() => exportExcel(tableData)}
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

const CellNew = () => (
  <tr>
    <td>.</td>
  </tr>
);

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const DataCell = ({ id, data, renderAsIntegers }) => (
  <tr>
    <td>{id}</td>
    {data.map((item, index) => (
      <td key={index}>
        {!renderAsIntegers && item !== 0
          ? parseInt(item)
          : item === 0
          ? "."
          : item}
      </td>
    ))}
  </tr>
);

const beloppValues = (data) => {
  return Object.values(data).map((item) => {
    const beloppArr = months.map((month) => {
      const monthData = item.find(
        (innerItem) => innerItem.bokford.slice(5, 7) === month
      );
      return monthData ? monthData.belopp : ".";
    });
    return beloppArr.every((belopp) => belopp === ".")
      ? item.map(() => ".")
      : beloppArr;
  });
};

const DataComponent = ({ data }) => (
  <>
    {Object.keys(data).map((key, index) => {
      return (
        <tr key={index}>
          <td>{key}</td>
          {beloppValues(data)[index].map((belopp, innerIndex) => (
            <td key={innerIndex}>{belopp}</td>
          ))}
        </tr>
      );
    })}
  </>
);

const DataCatCell = ({ dataCat, data }) => {
  const [openKey, setOpenKey] = useState("");
  const [objData, setObjData] = useState({});
  const onClick = (key) => {
    setObjData(objRemoveKeysDate(handleDatOnClick(data[key])));
    if (key === openKey) return setOpenKey("");
    if (Object.keys(handleDatOnClick(data[key])).length > 1) {
      setOpenKey(key);
    }
  };

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <>
            <tr
              className="cursor-pointer"
              key={index}
              onClick={() => onClick(key)}
            >
              <td>{key}</td>
              {dataCat[index].map((belopp, innerIndex) => {
                return (
                  <td key={innerIndex}>
                    {belopp === "." ? belopp : parseInt(belopp)}
                  </td>
                );
              })}
            </tr>
            {key === openKey && <DataComponent data={objData} />}
          </>
        );
      })}
    </>
  );
};

function handleDatOnClick(data) {
  return data.reduce((acc, obj) => {
    const key = obj.text;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export default Layout;
