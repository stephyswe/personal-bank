import { headersTop } from "../../utils/data";

const TableHeaderRow = ({ headers }) => (
  <tr>
    {headers.map((header, index) => (
      <th key={index}>{header}</th>
    ))}
  </tr>
);

export const CellTop = () => <TableHeaderRow headers={headersTop} />;
