export default function objToArray(obj) {
  return Object.keys(obj).map(function(key) {
    return {
      key: key,
      value: obj[key]
    };
  });
}
