// const redOffset = 0;
const PIXEL = 4;

// const RED = 0; // srsly?
const BLUE = 2;
const GREEN = 1;
const TOLERANCE = 40;

function noticeablyDiffers(colorDiff) {
  return (colorDiff > TOLERANCE) || (colorDiff < -TOLERANCE);
}

export default function getDifferenceRect(backgroundFrame, currentFrame, compareWidth, compareHeight) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = pixelRowSize * compareHeight;

  let topRow = Infinity;

  let bottomRow = 0;

  let leftCol = Infinity;

  let rightCol = 0;

  let isChanged = false;

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
    top: topRow,
    left: leftCol,
    bottom: bottomRow,
    right: rightCol,
    width: rightCol - leftCol,
    height: bottomRow - topRow,
    isChanged
  };
}
