export default function getWidthOption() {
  let maxWidth = window.innerWidth - 32; // space for scroll
  const maxHeight = maxWidth / 4 * 3;

  if (maxHeight > window.innerHeight) {
    maxWidth = window.innerHeight / 3 * 4;
  }

  maxWidth = Math.round(maxWidth);

  return {
    min: Math.round(maxWidth / 10),
    max: maxWidth,
    value: Math.round(maxWidth / 2)
  };
}
