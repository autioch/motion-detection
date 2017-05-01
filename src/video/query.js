const ratio = 0.75;

export default function query({ width, source }) {
  return {
    width,
    height: Math.round(width * ratio),
    source
  };
}
