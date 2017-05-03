import download from './download';
import getFilename from './getFilename';

export default function screeenshot(canvas) {
  canvas.toBlob((blob) => download(blob, getFilename()));
}
