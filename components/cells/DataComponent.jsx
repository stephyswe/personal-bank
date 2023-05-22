import { mapDataValues } from "../../utils/common/mapDataValues";
import { mapDataValuesClick } from "../../utils/common/mapDataValuesClick";

export const DataComponent = ({ data, isClick }) => {
  const functionToUse = isClick ? mapDataValuesClick : mapDataValues;
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
