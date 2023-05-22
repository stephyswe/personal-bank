import { headersYear } from "../../utils/data";

const TableDataRow = ({ id, data }) => (
  <tr>
    <td className="text-left">{id}</td>
    {data.map((datum, index) => (
      <td key={index}>{datum}</td>
    ))}
  </tr>
);

export const CellYear = ({ id }) => <TableDataRow id={id} data={headersYear} />;
