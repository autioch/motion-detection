export default function objToArray(obj) {
  return Object.keys(obj).map((key) => ({
    key,
    value: obj[key]
  }));
}
