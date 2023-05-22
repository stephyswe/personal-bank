import { months } from "../data/months";

export const mapDataValuesClick = (data) => {
  return Object.values(data).map((item) => {
    // Map values for each month
    const mappedValues = months.map((month) => {
      // Filter data based on month
      const monthData = item.filter(
        (innerItem) => innerItem.bokford.slice(5, 7) === month
      );

      // Calculate total value if data is available for the month
      if (monthData.length > 0) {
        const totalValue = monthData.reduce(
          (acc, curr) => acc + curr.belopp,
          0
        );
        return parseInt(totalValue);
      } else {
        // Return "." if no data is available for the month
        return ".";
      }
    });

    // Check if all values are ".", replace with "." if true
    return mappedValues.every((value) => value === ".")
      ? item.map(() => ".")
      : mappedValues;
  });
};
