import { useEffect, useState } from "react";
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

  console.log("combinedExpensesData2", moreData.expenseCat);

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
              <tr>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
                <th>F</th>
                <th>G</th>
                <th>H</th>
                <th>I</th>
                <th>J</th>
                <th>K</th>
                <th>L</th>
                <th>M</th>
              </tr>
              <tr>
                <th className="text-left">Sammanställning</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>Maj</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Okt</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
              <tr>
                <th className="text-left">Kassa i början</th>
                <th>18681</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
              </tr>
              <DataSum id="Månadens inbetalningar" data={incomeObj} />
              <DataSum id="Månadens utbetalningar" data={expObj} />
              <DataSumTotal
                id="Månadens totala inbetalningar"
                income={incomeObj}
                expenses={expObj}
              />
              <tr>
                <th className="text-left">Kassa i slutet</th>
                <th>2</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
                <th>X</th>
              </tr>
              <NewTR />
              <NewTR />

              <tr>
                <td>Inbetalningar</td>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>Maj</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Okt</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
              <DataComponent data={incomeObj} />

              <NewTR />
              <NewTR />
              {/* <tr>
                <td>Utbetalningar (Kategorier)</td>
              </tr>
              <DataComponentCombineCategories data={moreData.expenseCat2} /> */}

              <NewTR />
              <tr>
                <td>Utbetalningar</td>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>Maj</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Okt</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
            </thead>
            <tbody>
              <DataComponentCombine data={expObj} />
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

const DataSumTotal = ({ income, expenses, id }) => {
  // add the belopp values of each key in data object based on the month
  const getMonthlySums = (income) => {
    const sums = Array.from({ length: 12 }, () => 0);
    Object.values(income).forEach((item) => {
      item.forEach((innerItem) => {
        const month = Number(innerItem.bokford.slice(5, 7)) - 1;
        if (Number.isInteger(month)) sums[month] += innerItem.belopp;
      });
    });
    return sums;
  };

  const inc = getMonthlySums(income);
  const exp = getMonthlySums(expenses);

  // take two arrays and subtract the values of each index and create new array
  const subtractArrays = (arr1, arr2) => {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push(arr1[i] - arr2[i]);
    }
    return result;
  };

  return (
    <tr>
      <td>{id}</td>
      {subtractArrays(inc, exp).map((item, index) => (
        <td key={index}>{parseInt(item)}</td>
      ))}
    </tr>
  );
};

const DataSum = ({ data, id }) => {
  // add the belopp values of each key in data object based on the month
  const getMonthlySums = (data) => {
    const sums = Array.from({ length: 12 }, () => 0);
    Object.values(data).forEach((item) => {
      item.forEach((innerItem) => {
        const month = Number(innerItem.bokford.slice(5, 7)) - 1;
        if (Number.isInteger(month)) sums[month] += innerItem.belopp;
      });
    });
    return sums;
  };

  return (
    <tr>
      <td>{id}</td>
      {getMonthlySums(data).map((item, index) => (
        <td key={index}>{parseInt(item)}</td>
      ))}
    </tr>
  );
};

const months = [
  "01",
  /* "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12", */
];

const DataComponent = ({ data }) => {
  const beloppValues = Object.values(data).map((item) => {
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

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <tr key={index}>
            <td>{key}</td>
            {beloppValues[index].map((belopp, innerIndex) => (
              <td key={innerIndex}>{belopp}</td>
            ))}
          </tr>
        );
      })}
    </>
  );
};

const DataComponentCombine = ({ data }) => {
  const beloppValues = Object.values(data).map((item) => {
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

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <tr key={index}>
            <td>{key}</td>
            {beloppValues[index].map((belopp, innerIndex) => (
              <td key={innerIndex}>{belopp}</td>
            ))}
          </tr>
        );
      })}
    </>
  );
};

const DataComponentCombineCategories = ({ data }) => {
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

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <tr key={index}>
            <td>{key}</td>
            {beloppValues[index].map((belopp, innerIndex) => (
              <td key={innerIndex}>
                {belopp === "." ? belopp : parseInt(belopp)}
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
};

export default Layout;
