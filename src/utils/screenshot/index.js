import download from './download';
import getFilename from './getFilename';

export default function screenshot(canvas) {
  canvas.toBlob((blob) => download(blob, getFilename()));
}
