// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;

const MAX_DIFF_PIXEL = 5;

export default function getPixelImageDiffer({ quality, colorTolerance }, compareWidth, compareHeight) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;
  let pixels;

  function reset() {
    pixels = [];
  }

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > colorTolerance) || (colorDiff < -colorTolerance);
  }

  function markChange(col, row) {
    pixels.push(col * quality, row * quality);
  }

  function diffImage(backgroundFrame, currentFrame) {
    reset();

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
      changed: pixels.length > 0,
      pixels
    };
  }

  function diffsEqual({ pixels: pixels1 = [] }, { pixels: pixels2 = [] }) {
    const firstLength = pixels1.length;

    let differentPixelCount = 0;

    for (let index = 0; index < firstLength; index++) {
      if (pixels1[index] !== pixels2[index]) {
        differentPixelCount++; // eslint-disable-line no-plusplus
        if (differentPixelCount > MAX_DIFF_PIXEL) {
          return false;
        }
      }
    }

    return true;
  }

  return {
    diffImage,
    diffsEqual
  };
}
