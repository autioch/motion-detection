import isPixelDifferent from './isPixelDifferent';

const PIXEL = 4;

export default function getDifferenceRect(frame1, frame2, compareWidth, noticeablyDiffers) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = frame1.length;

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
    if (isPixelDifferent(frame1, frame2, pixel, noticeablyDiffers)) {
      isChanged = true;
      markChange((pixel % pixelRowSize) / PIXEL, Math.floor(pixel / pixelRowSize));
    }
  }

  return {
    top: topRow,
    left: leftCol,
    width: rightCol - leftCol,
    height: bottomRow - topRow,
    isChanged
  };
}
