import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  headersTop,
  headersYear,
  objectCustomExpense,
  objectKeysAll,
} from "../utils/data";
import { objRemoveKeysDate } from "../utils/api";
import {
  beloppValues,
  beloppValuesOnClick,
  convertData,
  objWithKeys,
} from "../utils/common";

const Layout = ({ newData, tableData, showModal, columns, buttonExport }) => {
  const [initData, setInitData] = useState(newData);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (initData) convertData(initData, setData);
  }, [initData]);

  const onClick = () => {
    convertData(changeDate(initData), setData);
  };

  function changeDate(data) {
    return data.filter((item) => {
      const date = new Date(item.bokford);
      return date >= new Date("2023-01-01") && date <= new Date("2023-01-02");
    });
  }

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
          <button onClick={onClick}>Change</button>
          {data && <DataMain data={data} />}
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

const DataMain = ({
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
}) => {
  return (
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
        <DataCell id="Kassa i slutet" data={total} renderAsIntegers={true} />
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
        <DataCatCell isCategories data={expAll} dataCat={expAllCat} />
        <CellNew />
        <CellYear id="Utbetalningar" />
        <DataComponent data={expAllNew} />
      </tbody>
    </table>
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

const DataComponent = ({ data, isClick }) => {
  const functionToUse = isClick ? beloppValuesOnClick : beloppValues;
  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <tr key={index}>
            <td>{key}</td>
            {functionToUse(data)[index].map((belopp, innerIndex) => (
              <td key={innerIndex} onClick={isClick ? isClick : null}>
                {belopp}
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
};

function highLightKnownKeys(categoryKey, isCategories) {
  if (categoryKey in objectKeysAll && isCategories) {
    return <td className="bg-green-200">{categoryKey}</td>;
  }

  return <td>{categoryKey}</td>;
}

const DataCatCell = ({ isCategories, dataCat, data }) => {
  const [openKey, setOpenKey] = useState("");
  const [objData, setObjData] = useState({});
  const onClick = (key) => {
    setObjData(objRemoveKeysDate(objWithKeys(data[key])));
    if (key === openKey) return setOpenKey("");
    if (Object.keys(objWithKeys(data[key])).length > 1) {
      setOpenKey(key);
    }
  };

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <Fragment key={index}>
            <tr
              className={`cursor-pointer`}
              onClick={() => onClick(key)}
            >
              {highLightKnownKeys(key, isCategories)}
              {dataCat[index].map((belopp, innerIndex) => {
                return (
                  <td key={innerIndex}>
                    {belopp === "." ? belopp : parseInt(belopp)}
                  </td>
                );
              })}
            </tr>
            {key === openKey && <DataComponent data={objData} isClick />}
          </Fragment>
        );
      })}
    </>
  );
};

export default Layout;
