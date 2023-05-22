export const DataCell = ({ id, data, renderAsIntegers }) => (
  <tr>
    <td>{id}</td>
    {data.map((item, index) => (
      <td key={index}>
        {!renderAsIntegers && item !== 0
          ? parseInt(item)
          : item === 0
          ? "."
          : item}
      </td>
    ))}
  </tr>
);
