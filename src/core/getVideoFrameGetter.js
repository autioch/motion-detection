export default function getVideoFrameGetter(compareWidth, compareHeight) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = compareWidth;
  canvas.height = compareHeight;

  return function getVideoFrame(video) {
    context.clearRect(0, 0, compareWidth, compareHeight);
    context.drawImage(video, 0, 0, compareWidth, compareHeight);

    return context.getImageData(0, 0, compareWidth, compareHeight).data;
  };
}
