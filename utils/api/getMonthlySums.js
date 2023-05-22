export const getMonthlySums = (value) => {
  const sums = Array.from({ length: 12 }, () => 0);
  Object.values(value).forEach((item) => {
    item.forEach((innerItem) => {
      const month = Number(innerItem.bokford.slice(5, 7)) - 1;
      if (Number.isInteger(month)) sums[month] += innerItem.belopp;
    });
  });
  return sums;
};
