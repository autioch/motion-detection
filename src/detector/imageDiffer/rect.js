// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;

export default function getRectImageDiffer({ quality, colorTolerance }, compareWidth, compareHeight) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;
  let topRow;
  let bottomRow;
  let leftCol;
  let rightCol;
  let changed;

  function reset() {
    topRow = Infinity;
    bottomRow = 0;
    leftCol = Infinity;
    rightCol = 0;
    changed = false;
  }

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > colorTolerance) || (colorDiff < -colorTolerance);
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

  function diffImage(backgroundFrame, currentFrame) {
    reset();

    for (let pixel = 0; pixel < pixelCount; pixel = pixel + PIXEL) {
      if (
      noticeablyDiffers(backgroundFrame[pixel] - currentFrame[pixel]) ||
      noticeablyDiffers(backgroundFrame[pixel + GREEN] - currentFrame[pixel + GREEN]) ||
      noticeablyDiffers(backgroundFrame[pixel + BLUE] - currentFrame[pixel + BLUE])
    ) {
        changed = true;
        markChange((pixel % pixelRowSize) / PIXEL, Math.floor(pixel / pixelRowSize));
      }
    }

    return {
      top: topRow * quality,
      left: leftCol * quality,
      height: (bottomRow - topRow) * quality,
      width: (rightCol - leftCol) * quality,
      changed
    };
  }

  function diffsEqual(diff1, diff2) {
    return (diff1.top === diff2.top) &&
          (diff1.left === diff2.left) &&
          (diff1.height === diff2.height) &&
          (diff1.width === diff2.width);
  }

  return {
    diffImage,
    diffsEqual
  };
}
