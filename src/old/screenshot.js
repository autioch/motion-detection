import download from './download';

function getFilename() {
  const dateTime = new Date().toLocaleString().replace(/(\.|, |:)/g, '-');

  return `motion-detection${dateTime}.png`;
}

export default function screeenshot(canvas) {
  canvas.toBlob((blob) => {
    download(blob, getFilename());
  });
}
