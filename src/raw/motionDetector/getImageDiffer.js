// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;

export default function getImageDiffer({ quality, colorTolerance }, compareWidth, compareHeight) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;
  let topRow;
  let bottomRow;
  let leftCol;
  let rightCol;
  let changed;
  let col;
  let row;

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

  function markChange(currentCol, currentRow) {
    if (currentCol < leftCol) {
      leftCol = currentCol;
    }
    if (currentCol > rightCol) {
      rightCol = currentCol;
    }
    if (currentRow < topRow) {
      topRow = currentRow;
    }
    if (currentRow > bottomRow) {
      bottomRow = currentRow;
    }
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
        col = (pixel % pixelRowSize) / PIXEL;
        row = Math.floor(pixel / pixelRowSize);
        markChange(col, row);
      }
    }

    return {
      top: topRow * quality,
      left: leftCol * quality,
      height: (bottomRow - topRow) * quality,
      width: (rightCol - leftCol) * quality,
      changed
    };
  };
}
