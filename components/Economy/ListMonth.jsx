import { CellMonth } from "../cellsMonth/CellMonth";
import { CellMonthDataCatCell } from "../cellsMonth/CellMonthDataCatCell";
import { CellMonthDataCell } from "../cellsMonth/CellMonthDataCell";
import { CellMonthDataComponent } from "../cellsMonth/CellMonthDataComponent";
import { CellNew } from "../cells/CellNew";

export const EconomyMonthList = ({
  data: {
    expAllNew,
    expCustom,
    expSolid,
    incTotal,
    expTotal,
    incomeBetter,
    expSolidCat,
    expCustomCat,
    permExpense,
    customExpense,
    expAllCat,
    expAll,
  },
}) => {
  return (
    <table>
      <tbody>
        <CellMonth id="Sammanställning" />

        <CellNew />
        <CellMonthDataCell id="Utbetalningar - Fasta" data={expSolid} />
        <CellMonthDataCell id="Utbetalningar - Spridda" data={expCustom} />
        <CellNew />
        <CellMonthDataCell id="Månadens inbetalningar" data={incTotal} />
        <CellMonthDataCell id="Månadens utbetalningar" data={expTotal} />
        {/* <CellMonthDataCellTotal id="Kassa i slutet" data={total} /> */}
        <CellNew />
        <CellNew />
        <CellMonth id="Inbetalningar" />
        <CellMonthDataComponent data={incomeBetter} />
        <CellNew />
        <CellMonth id="Fasta utgifter" />
        <CellMonthDataCatCell data={permExpense} dataCat={expSolidCat} />
        <CellNew />
        <CellMonth id="Spridda utgifter" />
        <CellMonthDataCatCell data={customExpense} dataCat={expCustomCat} />
        <CellNew />
        <CellMonth id="Utbetalningar (Kategorier)" />
        <CellMonthDataCatCell isCategories data={expAll} dataCat={expAllCat} />
        <CellNew />
        <CellMonth id="Utbetalningar" />
        <CellMonthDataComponent data={expAllNew} />
      </tbody>
    </table>
  );
};
