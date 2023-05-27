import { headersYear } from "../../utils/data/headersYear";

export const CellYear = ({ id }) => (
  <tr>
    <td className="text-left">{id}</td>
    {headersYear.map((datum, index) => (
      <td key={index}>{datum}</td>
    ))}
  </tr>
);


