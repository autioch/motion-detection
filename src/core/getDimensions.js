const MIN_RATIO = 0.1;
const RATIO = 0.75;
const SCROLL_VERTICAL = 0;
const SCROLL_HORIZONTAL = 30; // extra space for chrome download bar

export default function getDimensions() {
  let width = window.innerWidth - SCROLL_VERTICAL;

  let height = window.innerHeight - SCROLL_HORIZONTAL;

  if (width * RATIO > height) {
    width = Math.round(height / RATIO);
  } else {
    height = Math.round(width * RATIO);
  }

  const minWidth = Math.round(width * MIN_RATIO);
  const minHeight = Math.round(height * MIN_RATIO);

  return {
    minWidth,
    maxWidth: width,
    width,
    minHeight,
    maxHeight: height,
    height
  };
}
