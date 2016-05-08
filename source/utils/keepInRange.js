export default function keepInRange(min, max, value) {
  return value < min ? min : value > max ? max : value;
}
