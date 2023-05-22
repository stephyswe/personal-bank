export function objRemoveKeysDate(dataObj) {
  const obj = {};
  for (const [key, value] of Object.entries(dataObj)) {
    if (key.includes("/")) {
      const index = key.indexOf("/");
      const newKey = key.slice(0, index).trim();
      if (!obj[newKey]) {
        obj[newKey] = [];
      }
      obj[newKey] = [...obj[newKey], ...value];
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
