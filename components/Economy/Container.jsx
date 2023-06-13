/* eslint-disable react/no-unescaped-entities */
import { monthNames } from "../Layout";
import { EconomyList } from "./List";
import { EconomyMonthList } from "./ListMonth";

const currentMonth = new Date().getMonth();

const EconomyContainer = ({
  onButtonClick,
  data,
  isClick,
  handleSelect,
  selectedMonth,
}) => {
  return (
    <div className="block bg-white p-10 mb-5">
      <div className="flex justify-between items-center w-full mb-5">
        <h3 className="font-medium text-2xl text-gray-70">Budget</h3>
      </div>
      {/* convert to dropdown with months */}

      <select value={selectedMonth} onChange={handleSelect}>
        {monthNames.slice(0, currentMonth + 1).map((month, index) => (
          <option key={index} value={(index + 1).toString().padStart(2, "0")}>
            {month}
          </option>
        ))}
      </select>
      <button
        className="bg-gray-200 rounded border border-cyan-50"
        onClick={onButtonClick}
      >
        Change to {isClick ? "Month" : "Year"}
      </button>
      {isClick ? <EconomyList data={data} /> : <EconomyMonthList data={data} />}
    </div>
  );
};

export default EconomyContainer;
