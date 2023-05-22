export const groupByBelopp = (data, isPositive) => {
    const obj = {};

    const filterFunc = isPositive
      ? (item) => item.belopp > 0
      : (item) => item.belopp < 0;

    for (const item of data.filter(filterFunc)) {
      const key = item.text;
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push(item);
    }

    return obj;
  };