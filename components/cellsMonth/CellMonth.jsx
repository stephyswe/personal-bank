import { monthToLetter } from "../../utils/convertMonths";

export const CellMonth = ({ id }) => (
  <tr>
    <td className="text-left">{id}</td>
    <td>{monthToLetter(localStorage.getItem("selectedMonth"))}</td>
  </tr>
);
