export function changeDate(data) {
  return data.filter((item) => {
    const date = new Date(item.bokford);
    return date >= new Date("2023-04-01") && date <= new Date("2023-04-31");
  });
}
