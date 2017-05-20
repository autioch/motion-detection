// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;

export default function getPixelImageDiffer({ quality, colorTolerance }, compareWidth, compareHeight) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;
  let pixels;
  let changed;

  function reset() {
    pixels = [];
    changed = false;
  }

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > colorTolerance) || (colorDiff < -colorTolerance);
  }

  function markChange(col, row) {
    changed = true;
    pixels.push(col * quality, row * quality);
  }

  return function diffImage(previousFrame, currentFrame) {
    reset();

    for (let pixel = 0; pixel < pixelCount; pixel = pixel + PIXEL) {
      if (
      noticeablyDiffers(previousFrame[pixel] - currentFrame[pixel]) ||
      noticeablyDiffers(previousFrame[pixel + GREEN] - currentFrame[pixel + GREEN]) ||
      noticeablyDiffers(previousFrame[pixel + BLUE] - currentFrame[pixel + BLUE])
    ) {
        changed = true;
        markChange((pixel % pixelRowSize) / PIXEL, Math.floor(pixel / pixelRowSize));
      }
    }

    return pixels;
  };
}
