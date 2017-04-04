const scrollWidth = 32;
const heightRatio = 1.33;
const widthRatio = 0.75;
const minWidthRatio = 0.1;
const valueRatio = 0.5;

export default function getWidthOption() {
  // space for scroll
  let maxWidth = window.innerWidth - scrollWidth;
  const maxHeight = maxWidth * widthRatio;

  if (maxHeight > window.innerHeight) {
    maxWidth = window.innerHeight * heightRatio;
  }

  maxWidth = Math.round(maxWidth);

  return {
    min: Math.round(maxWidth * minWidthRatio),
    max: maxWidth,
    value: Math.round(maxWidth * valueRatio)
  };
}
