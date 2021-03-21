/* eslint-disable max-len */
// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;

/* eslint-disable-next-line max-params */
export default function getDifferenceRect(backgroundFrame, currentFrame, compareWidth, compareHeight, tolerance, originaWidthModifier, originaHeightModifier) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;

  let topRow = Infinity;

  let bottomRow = 0;

  let leftCol = Infinity;

  let rightCol = 0;

  let isChanged = false;

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > tolerance) || (colorDiff < -tolerance);
  }

  function markChange(col, row) {
    if (col < leftCol) {
      leftCol = col;
    }
    if (col > rightCol) {
      rightCol = col;
    }
    if (row < topRow) {
      topRow = row;
    }
    if (row > bottomRow) {
      bottomRow = row;
    }
  }

  for (let pixel = 0; pixel < pixelCount; pixel = pixel + PIXEL) {
    if (
      noticeablyDiffers(backgroundFrame[pixel] - currentFrame[pixel]) ||
      noticeablyDiffers(backgroundFrame[pixel + GREEN] - currentFrame[pixel + GREEN]) ||
      noticeablyDiffers(backgroundFrame[pixel + BLUE] - currentFrame[pixel + BLUE])
    ) {
      isChanged = true;
      markChange((pixel % pixelRowSize) / PIXEL, Math.floor(pixel / pixelRowSize));
    }
  }

  return {
    top: Math.floor(topRow * originaHeightModifier),
    left: Math.floor(leftCol * originaWidthModifier),
    bottom: Math.floor(bottomRow * originaHeightModifier),
    right: Math.floor(rightCol * originaWidthModifier),
    width: Math.floor((rightCol * originaWidthModifier) - (leftCol * originaWidthModifier)),
    height: Math.floor((bottomRow * originaHeightModifier) - (topRow * originaHeightModifier)),
    isChanged
  };
}
