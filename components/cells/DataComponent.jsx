import { beloppValues, beloppValuesOnClick } from "../../utils/common";

export const DataComponent = ({ data, isClick }) => {
  const functionToUse = isClick ? beloppValuesOnClick : beloppValues;
  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <tr key={index}>
            <td>{key}</td>
            {functionToUse(data)[index].map((belopp, innerIndex) => (
              <td key={innerIndex} onClick={isClick ? isClick : null}>
                {belopp}
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
};
