// Fungsi untuk menampilkan data dari api
export const apiData = (data) => {
  const product = data.products;
  setTableData(product);
  setButtonExport(true);
  setShowModal(!showModal);
};
