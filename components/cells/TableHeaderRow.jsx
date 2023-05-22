import { headersTop } from "../../utils/data/headersTop";

export const TableHeaderRow = () => (
  <tr>
    {headersTop.map((header, index) => (
      <th key={index}>{header}</th>
    ))}
  </tr>
);
