export const CellMonthDataCell = ({ id, data, renderAsIntegers }) => (
  <tr>
    <td>{id}</td>
    {data.map((item, index) => {
      if (item === 0) return;

      return (
        <td key={index}>
          {!renderAsIntegers && item !== 0
            ? parseInt(item)
            : item === 0
            ? "."
            : item}
        </td>
      );
    })}
  </tr>
);
