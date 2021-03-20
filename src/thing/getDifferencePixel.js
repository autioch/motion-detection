/* eslint-disable max-len */
// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;

/* eslint-disable-next-line max-params */
export default function getDifferencePixel(backgroundFrame, currentFrame, compareWidth, compareHeight, tolerance, originaWidthModifier, originaHeightModifier) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;
  const pixels = [];

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > tolerance) || (colorDiff < -tolerance);
  }

  function markChange(col, row) {
    pixels.push((col * originaHeightModifier) - 0.5, (row * originaWidthModifier) - 0.5);
  }

  for (let pixel = 0; pixel < pixelCount; pixel = pixel + PIXEL) {
    if (
      noticeablyDiffers(backgroundFrame[pixel] - currentFrame[pixel]) ||
      noticeablyDiffers(backgroundFrame[pixel + GREEN] - currentFrame[pixel + GREEN]) ||
      noticeablyDiffers(backgroundFrame[pixel + BLUE] - currentFrame[pixel + BLUE])
    ) {
      markChange((pixel % pixelRowSize) / PIXEL, Math.floor(pixel / pixelRowSize));
    }
  }

  return {
    pixels,
    isChanged: pixels.length > 0
  };
}
