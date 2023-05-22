import { CellNew } from "../cells/CellNew";
import { CellYear } from "../cells/CellYear";
import { DataCatCell } from "../cells/DataCatCell";
import { DataCell } from "../cells/DataCell";
import { DataComponent } from "../cells/DataComponent";
import { TableHeaderRow } from "../cells/TableHeaderRow";

export const EconomyList = ({
  data: {
    incAtStart,
    expCustom,
    expSolid,
    incTotal,
    expTotal,
    total,
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
      <thead>
        <TableHeaderRow />
      </thead>
      <tbody>
        <CellYear id="Sammanställning" />
        <DataCell
          id="Kassa i början"
          data={incAtStart}
          renderAsIntegers={true}
        />
        <CellNew />
        <DataCell id="Utbetalningar - Fasta" data={expSolid} />
        <DataCell id="Utbetalningar - Spridda" data={expCustom} />
        <CellNew />
        <DataCell id="Månadens inbetalningar" data={incTotal} />
        <DataCell id="Månadens utbetalningar" data={expTotal} />
        <DataCell id="Kassa i slutet" data={total} renderAsIntegers={true} />
        <CellNew />
        <CellNew />
        <CellYear id="Inbetalningar" />
        <DataComponent data={incomeBetter} />
        <CellNew />
        <CellYear id="Fasta utgifter" />
        <DataCatCell data={permExpense} dataCat={expSolidCat} />
        <CellNew />
        <CellYear id="Spridda utgifter" />
        <DataCatCell data={customExpense} dataCat={expCustomCat} />
        <CellNew />
        <CellYear id="Utbetalningar (Kategorier)" />
        <DataCatCell isCategories data={expAll} dataCat={expAllCat} />
        {/* <CellNew /> */}
        {/* <CellYear id="Utbetalningar" />
        <DataComponent data={expAllNew} /> */}
      </tbody>
    </table>
  );
};
