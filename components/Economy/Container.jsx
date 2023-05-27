import { EconomyList } from "./List";
import { EconomyMonthList } from "./ListMonth";

const EconomyContainer = ({ onButtonClick, data, isClick }) => (
  <div className="block bg-white p-10 mb-5">
    <div className="flex justify-between items-center w-full mb-5">
      <h3 className="font-medium text-2xl text-gray-70">Budget</h3>
    </div>
    <button
      className="bg-gray-200 rounded border border-cyan-50"
      onClick={onButtonClick}
    >
      Mån: Apr
    </button>

    {isClick ? <EconomyList data={data} /> : <EconomyMonthList data={data} />}
  </div>
);

export default EconomyContainer;
