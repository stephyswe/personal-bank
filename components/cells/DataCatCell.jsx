import { Fragment, useState } from "react";
import { DataComponent } from "./DataComponent";
import { objectKeysAll } from "../../utils/data";

function highLightKnownKeys(categoryKey, isCategories) {
  if (categoryKey in objectKeysAll && isCategories) {
    return <td className="bg-green-200">{categoryKey}</td>;
  }

  return <td>{categoryKey}</td>;
}

export const DataCatCell = ({ isCategories, dataCat, data }) => {
  const [openKey, setOpenKey] = useState("");
  const [objData, setObjData] = useState({});
  const onClick = (key) => {
    setObjData(objRemoveKeysDate(objWithKeys(data[key])));
    if (key === openKey) return setOpenKey("");
    if (Object.keys(objWithKeys(data[key])).length > 1) {
      setOpenKey(key);
    }
  };

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <Fragment key={index}>
            <tr className={`cursor-pointer`} onClick={() => onClick(key)}>
              {highLightKnownKeys(key, isCategories)}
              {dataCat[index].map((belopp, innerIndex) => {
                return (
                  <td key={innerIndex}>
                    {belopp === "." ? belopp : parseInt(belopp)}
                  </td>
                );
              })}
            </tr>
            {key === openKey && <DataComponent data={objData} isClick />}
          </Fragment>
        );
      })}
    </>
  );
};
