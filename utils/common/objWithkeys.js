export function objWithKeys(data) {
  return data.reduce((acc, obj) => {
    const key = obj.text;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
