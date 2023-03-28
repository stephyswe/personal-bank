import { useState } from "react";
import DataTable from "react-data-table-component";

const Layout = ({
  moreData,
  tableData,
  showModal,
  setShowModal,
  columns,
  importExcel,
  exportExcel,
  apiData,
  data,
  buttonExport,
  setButtonExport,
}) => {
  const [incomeObj, setIncomeObj] = useState(moreData.income);
  const [expObj, setExpObj] = useState(moreData.expense);

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

  const headersTop = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const headersYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  const TrTop = () => <TableHeaderRow headers={headersTop} />;
  const TrYear = ({ id }) => <TableDataRow id={id} data={headersYear} />;

  function NewTR() {
    return (
      <tr>
        <td>.</td>
      </tr>
    );
  }
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
              <TrTop />
            </thead>
            <tbody>
              <TrYear id="Sammanställning" />
              <DataSumTotal
                id="Kassa i början"
                income={incomeObj}
                expenses={expObj}
                startVal={18772}
                hasStart={true}
              />
              <NewTR />
              <DataSum
                id="Utbetalningar - custom"
                data={moreData.customExpense}
              />
              <DataSum id="Utbetalningar - perm" data={moreData.permExpense} />
              <NewTR />
              <DataSum id="Månadens inbetalningar" data={incomeObj} />
              <DataSum id="Månadens utbetalningar" data={expObj} />
              <DataSumTotal
                id="Kassa i slutet"
                income={incomeObj}
                expenses={expObj}
                startVal={18772}
              />
              <NewTR />
              <NewTR />
              <TrYear id="Inbetalningar" />
              <DataComponent data={incomeObj} />
              <NewTR />
              <TrYear id="Perm Exp" />
              <DataComponentCombineCategories data={moreData.permExpense} />
              <NewTR />
              <TrYear id="Custom Exp" />
              <DataComponentCombineCategories data={moreData.customExpense} />
              <NewTR />

              <NewTR />
              <TrYear id="Utbetalningar (Kategorier)" />
              <TableRow
                data={{
                  name: "Kategori",
                  age: 2,
                  email: "2@",
                }}
              />
              <DataComponentCombineCategories data={moreData.expenseCat2} />

              <NewTR />
              <TrYear id="Utbetalningar" />
              <DataComponent data={expObj} />
            </tbody>
          </table>
        </div>

        <div className="block bg-white p-10">
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

// take two arrays and subtract the values of each index and create new array
const subtractArrays = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (i > 0) {
      result.push(arr1[i] + arr2[i] + result[i - 1]);
    } else {
      result.push(arr1[i] + arr2[i]);
    }
  }
  return result;
};

const getMonthlySums = (value) => {
  const sums = Array.from({ length: 12 }, () => 0);
  Object.values(value).forEach((item) => {
    item.forEach((innerItem) => {
      const month = Number(innerItem.bokford.slice(5, 7)) - 1;
      if (Number.isInteger(month)) sums[month] += innerItem.belopp;
    });
  });
  return sums;
};

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

const filterAndFillData = (income, expenses, startVal, hasStart) => {
  let inc = getMonthlySums(income);
  inc[0] += startVal;
  const exp = getMonthlySums(expenses);
  const newArr = subtractArrays(inc, exp);
  if (hasStart) {
    newArr.unshift(18772);
  }
  const incVal = hasStart ? 1 : 0;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const filteredData = newArr.filter(
    (_, index) => index - incVal < currentMonth
  );
  const filledData = new Array(12).fill(".");
  filteredData.forEach((item, index) => {
    filledData[index + incVal] = item;
  });
  if (hasStart) {
    filledData.shift();
    filledData.push(".");
  }
  return filledData.map((item) =>
    typeof item === "number" ? parseInt(item) : item
  );
};

const DataSumTotal = ({ income, expenses, id, startVal, hasStart }) => (
  <tr>
    <td>{id}</td>
    {filterAndFillData(income, expenses, startVal, hasStart).map(
      (item, index) => (
        <td key={index}>{item}</td>
      )
    )}
  </tr>
);

const DataSum = ({ data, id }) => (
  <tr>
    <td>{id}</td>
    {getMonthlySums(data).map((item, index) => (
      <td key={index}>{item === 0 ? "." : parseInt(item)}</td>
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

const DataComponentCombineCategories = ({ data }) => {
  const [openKey, setOpenKey] = useState("");

  const handleClick = (key) => {
    if (key === openKey) return setOpenKey("");
    setOpenKey(key);
  };

  const beloppValues = Object.values(data).map((item) => {
    const beloppArr = months.map((month) => {
      const monthData = item.find(
        (innerItem) => innerItem.bokford.slice(5, 7) === month
      );
      if (!monthData) return ".";
      const beloppSum = item
        .filter((innerItem) => innerItem.bokford.slice(5, 7) === month)
        .reduce((sum, innerItem) => sum + innerItem.belopp, 0);
      return beloppSum;
    });
    return beloppArr.every((belopp) => belopp === ".")
      ? item.map(() => ".")
      : beloppArr;
  });

  // check if Object.keys(data).map has more then one item with same text
  const hasSameText = Object.keys(data).map((key) => {
    const textArr = data[key].map((item) => item.text);
    return textArr.some((text, index) => textArr.indexOf(text) !== index);
  });

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <>
            <tr
              className="cursor-pointer"
              key={index}
              onClick={() => handleClick(key)}
            >
              <td>{key}</td>
              {beloppValues[index].map((belopp, innerIndex) => (
                <td key={innerIndex}>
                  {belopp === "." ? belopp : parseInt(belopp)}
                </td>
              ))}
            </tr>
            {key === openKey && (
              <>
                {data[key].map((item, innerIndex) => (
                  <tr key={innerIndex}>
                    <td>{item.text}</td>
                    <td>{item.belopp}</td>
                  </tr>
                ))}
              </>
            )}
          </>
        );
      })}
    </>
  );
};

const TableRow = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <tr onClick={handleClick}>
        <td>{data.name}</td>
        <td>{data.age}</td>
        <td>{data.email}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan="3">Detail view for {data.name}</td>
        </tr>
      )}
    </>
  );
};

export default Layout;
