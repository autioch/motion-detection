import { download } from 'utils';

export default function downloadScreenshot(canvas) {
  const serializedDate = new Date().toJSON();
  const timestamp = serializedDate.replace('T', ' ').replace('Z', '');
  const filename = `motion\\screenshot-${timestamp}.png`;

  canvas.toBlob((blob) => download(blob, filename));
}
