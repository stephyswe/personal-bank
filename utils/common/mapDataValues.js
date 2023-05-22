import { months } from "../data";

export const mapDataValues = (data) => {
    return Object.values(data).map((item) => {
      // Map values for each month
      const mappedValues = months.map((month) => {
        // Find data for the month
        const monthData = item.find(
          (innerItem) => innerItem.bokford.slice(5, 7) === month
        );

        // Get belopp value if data is available for the month, otherwise use "."
        return monthData ? monthData.belopp : ".";
      });

      // Check if all values are ".", replace with "." if true, otherwise return mappedValues
      return mappedValues.every((value) => value === ".")
        ? item.map(() => ".")
        : mappedValues;
    });
  };
