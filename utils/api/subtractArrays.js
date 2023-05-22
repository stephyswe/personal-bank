// take two arrays and subtract the values of each index and create new array
export const subtractArrays = (arr1, arr2) => {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      if (i > 0) {
        result.push(arr1[i] + arr2[i] + result[i - 1]);
      } else {
        result.push(arr1[i] + arr2[i]);
      }
    }
    return result;
  };