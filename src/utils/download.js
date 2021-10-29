const downloadSupport = typeof document.createElement('a').download !== 'undefined';
const msBlobSupport = typeof window.navigator.msSaveBlob !== 'undefined';
const urlDecayTimeout = 5000;

function downloadLocation(blob) {
  const href = window.URL.createObjectURL(blob);

  window.location = href;
  setTimeout(() => window.URL.revokeObjectURL(href), urlDecayTimeout);
}

function downloadLink(blob, filename) {
  const el = document.createElement('a');
  const href = window.URL.createObjectURL(blob);

  el.href = href;
  el.download = filename;
  document.body.appendChild(el);
  el.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(href);
    document.body.removeChild(el);
  }, urlDecayTimeout);
}

let download;

if (msBlobSupport) {
  download = (blob, filename) => window.navigator.msSaveBlob(blob, filename);
} else {
  download = downloadSupport ? downloadLink : downloadLocation;
}

export default download;
