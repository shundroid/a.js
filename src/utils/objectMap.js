export default function objectMap(object, callback) {
  const newObj = {};
  for (const key in object) {
    const returnObj = callback(key, object[key]);
    newObj[returnObj.key] = returnObj.value;
  }
  return newObj;
}

export function objectMapFromArray(array, callback) {
  const newObj = {};
  for (const item of array) {
    const returnObj = callback(item);
    newObj[returnObj.key] = returnObj.value;
  }
  return newObj;
}
