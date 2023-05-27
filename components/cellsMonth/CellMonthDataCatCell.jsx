import { Fragment, useState } from "react";

import { highLightCategories } from "../../utils/layout/highlightCategories";
import { objWithKeys } from "../../utils/common/objWithkeys";
import { objRemoveKeysDate } from "../../utils/api/objRemoveKeysDate";
import { CellMonthDataComponent } from "./CellMonthDataComponent";

export const CellMonthDataCatCell = ({ isCategories, dataCat, data }) => {
  const [openKey, setOpenKey] = useState("");
  const [objData, setObjData] = useState({});
  const onClick = (key) => {
    setObjData(objRemoveKeysDate(objWithKeys(data[key])));
    if (key === openKey) return setOpenKey("");
    if (Object.keys(objWithKeys(data[key])).length > 0) {
      setOpenKey(key);
    }
  };

  return (
    <>
      {Object.keys(data).map((key, index) => {
        return (
          <Fragment key={index}>
            <tr className={`cursor-pointer`} onClick={() => onClick(key)}>
              {highLightCategories(key, isCategories)}
              {dataCat[index].map((belopp, innerIndex) => {
                if (belopp === ".") return;
                return (
                  <td key={innerIndex}>
                    {belopp === "." ? belopp : parseInt(belopp)}
                  </td>
                );
              })}
            </tr>
            {key === openKey && (
              <CellMonthDataComponent data={objData} isClick />
            )}
          </Fragment>
        );
      })}
    </>
  );
};
