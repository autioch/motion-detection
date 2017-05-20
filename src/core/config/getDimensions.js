const MIN_RATIO = 0.1;
const RATIO = 0.75;
const SCROLL = 0;

export default function getDimensions() {
  let width = window.innerWidth - SCROLL;
  let height = window.innerHeight - SCROLL;

  if (width * RATIO > height) {
    width = Math.round(height / RATIO);
  } else {
    height = Math.round(width * RATIO);
  }

  return {
    minWidth: Math.round(width * MIN_RATIO),
    maxWidth: width,
    width,
    minHeight: Math.round(height * MIN_RATIO),
    maxHeight: height,
    height
  };
}
