export default function keepInRange(min, max, value) {
  if (value < min) {
    return min;
  }

  return value > max ? max : value;
}
