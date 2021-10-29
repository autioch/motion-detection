import isPixelDifferent from './isPixelDifferent';

const PIXEL = 4;

export default function getDifferencePixel(frame1, frame2, compareWidth, noticeablyDiffers) {
  const pixelRowSize = compareWidth * PIXEL;
  const pixelCount = frame1.length;
  const pixels = [];

  for (let pixel = 0; pixel < pixelCount; pixel = pixel + PIXEL) {
    if (isPixelDifferent(frame1, frame2, pixel, noticeablyDiffers)) {
      pixels.push(
        (pixel % pixelRowSize) / PIXEL, //  col
        Math.floor(pixel / pixelRowSize) // row
      );
    }
  }

  return {
    pixels,
    isChanged: pixels.length > 0
  };
}
