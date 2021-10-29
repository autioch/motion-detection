export function dictToOptions(idDict, labelDict) {
  return Object.values(idDict).map((id) => ({
    id,
    label: labelDict[id]
  }));
}

const MILISECOND = 1000;

export function getFps(lastRender, currentRender) {
  const delta = (currentRender - lastRender) / MILISECOND;

  return Math.floor(1 / delta);
}

const RATIO = 0.75;
const SCROLL_VERTICAL = 0;
const SCROLL_HORIZONTAL = 30; // extra space for chrome download bar

export function getDimensions() {
  let width = window.innerWidth - SCROLL_VERTICAL;

  let height = window.innerHeight - SCROLL_HORIZONTAL;

  if (width * RATIO > height) {
    width = Math.round(height / RATIO);
  } else {
    height = Math.round(width * RATIO);
  }

  return {
    width,
    height
  };
}
