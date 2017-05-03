// const redOffset = 0;
const blueOffset = 1;
const greenOffset = 2;
const pixelSize = 4;

export default function getImageDiffer({ quality, colorTolerance }, compareWidth, compareHeight) {
  const pixelRowSize = compareWidth * pixelSize;
  const pixelCount = compareWidth * pixelSize * compareHeight * pixelSize;

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > colorTolerance) || (colorDiff < -colorTolerance);
  }

  return function diffImage(previousFrame, currentFrame) {
    let topRow = Infinity;
    let bottomRow = 0;
    let leftCol = Infinity;
    let rightCol = 0;
    let changed = false;

    for (let pixel = 0; pixel < pixelCount; pixel = pixel + pixelSize) {
      if (
      noticeablyDiffers(previousFrame[pixel] - currentFrame[pixel]) ||
      noticeablyDiffers(previousFrame[pixel + blueOffset] - currentFrame[pixel + blueOffset]) ||
      noticeablyDiffers(previousFrame[pixel + greenOffset] - currentFrame[pixel + greenOffset])
    ) {
        const col = (pixel % pixelRowSize) / pixelSize;
        const row = Math.floor(pixel / pixelRowSize);

        changed = true;
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
