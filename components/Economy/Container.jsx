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
  setCustomSelect,
}) => {
  const onSubmit = (e) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the input values
    const firstValue = document.getElementById("firstInput").value;
    const secondValue = document.getElementById("secondInput").value;

    /// set values
    const newData = [firstValue, secondValue];
    setCustomSelect(newData);
    // Clear the input fields
    // document.getElementById("firstInput").value = "";
    // document.getElementById("secondInput").value = "";
  };

  return (
    <div className="block bg-white p-10 mb-5">
      <div className="flex justify-between items-center w-full mb-5">
        <h3 className="font-medium text-2xl text-gray-70">Budget</h3>
      </div>

      <div style={{ display: "flex" }}>
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
        {/* custom date - between */}
        {` - `}

        <form onSubmit={onSubmit}>
          <input
            id="firstInput"
            style={{ width: "50px", border: "1px solid black" }}
            type="text"
            defaultValue=""
          />
          {" - "}
          <input
            id="secondInput"
            style={{ width: "50px", border: "1px solid black" }}
            type="text"
            defaultValue=""
          />
          <button>Find</button>
        </form>
      </div>

      {isClick ? <EconomyList data={data} /> : <EconomyMonthList data={data} />}
    </div>
  );
};

export default EconomyContainer;
