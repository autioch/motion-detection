import download from './download';

export default function screenshot(canvas, fileName) {
  canvas.toBlob((blob) => download(blob, fileName));
}
