// Untuk membuat kolom pada datatable
export const columns = [
  {
    name: "Bokford",
    selector: (row) => row.bokford,
    sortable: true,
  },
  {
    name: "Valuta",
    selector: (row) => row.valuta,
    sortable: true,
  },
  {
    name: "Nummer",
    selector: (row) => row.nummer,
    sortable: true,
  },
  {
    name: "Text",
    selector: (row) => row.text,
    sortable: true,
  },
  {
    name: "Belopp",
    selector: (row) => row.belopp,
    sortable: true,
  },
  {
    name: "Saldo",
    selector: (row) => row.saldo,
    // selector: (row) => `Rp. ${(row.price * 15000).toLocaleString("id-ID")}`,
    sortable: true,
  },
];
