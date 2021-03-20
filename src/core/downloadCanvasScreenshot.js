import download from './download';

export default function downloadCanvasScreenshot(canvas) {
  const serializedDate = new Date().toJSON();
  const timestamp = serializedDate.replace('T', ' ').replace('Z', '');
  const filename = `motion\\screenshot-${timestamp}.png`;

  canvas.toBlob((blob) => download(blob, filename));
}