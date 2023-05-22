export const sortByOrder = (data, order) => {
  return Object.fromEntries(
    Object.entries(data).sort(
      ([keyA], [keyB]) => order.indexOf(keyA) - order.indexOf(keyB)
    )
  );
};
