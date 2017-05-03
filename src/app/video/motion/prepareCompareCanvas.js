const ratio = 0.75;

export default function prepareCompareCanvas(compareCanvas, width, quality) {
  const compareWidth = Math.round(width / quality);
  const compareHeight = Math.round(compareWidth * ratio);
  const compareContext = compareCanvas.getContext('2d');

  compareCanvas.width = compareWidth;
  compareCanvas.height = compareHeight;

  return {
    compareCanvas,
    compareContext,
    compareHeight,
    compareWidth
  };
}
