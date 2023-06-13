export function changeDate(data, month) {
  return data.filter((item) => {
    const date = new Date(item.bokford);
    return (
      date >= new Date(`2023-${month}-01`) &&
      date <= new Date(`2023-${month}-31`)
    );
  });
}
