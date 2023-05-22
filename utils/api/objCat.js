export function objCat(data, objectKeys) {
  const obj = {};
  for (const [key, value] of Object.entries(data)) {
    const matchedKey = Object.keys(objectKeys).find((objKey) =>
      objectKeys[objKey].includes(key)
    );
    if (matchedKey) {
      if (!obj[matchedKey]) {
        obj[matchedKey] = [];
      }
      obj[matchedKey] = [...obj[matchedKey], ...value];
    }
  }
  return obj;
}
