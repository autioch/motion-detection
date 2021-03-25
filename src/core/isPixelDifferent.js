const GREEN = 1;
const BLUE = 2;

export default function isPixelDifferent(frame1, frame2, pixelIndex, noticeablyDiffers) {
  return noticeablyDiffers(frame1[pixelIndex] - frame2[pixelIndex]) ||
    noticeablyDiffers(frame1[pixelIndex + GREEN] - frame2[pixelIndex + GREEN]) ||
    noticeablyDiffers(frame1[pixelIndex + BLUE] - frame2[pixelIndex + BLUE]);
}
