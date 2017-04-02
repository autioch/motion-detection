const URL = window.URL || window.webkitURL;

const downloadSupport = typeof document.createElement('a').download !== 'undefined';
const msBlobSupport = typeof window.navigator.msSaveBlob !== 'undefined';

function downloadMsBlob(blob, filename) {
  window.navigator.msSaveBlob(blob, filename);
}

function downloadLocation(blob) {
  const href = URL.createObjectURL(blob);

  window.location = href;
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

function downloadLink(blob, filename) {
  const el = document.createElement('a');
  const href = URL.createObjectURL(blob);

  el.href = href;
  el.download = filename;
  document.body.appendChild(el);
  el.click();
  setTimeout(() => {
    URL.revokeObjectURL(href);
    document.body.removeChild(el);
  }, 1000);
}

const download = msBlobSupport ? downloadMsBlob : downloadSupport ? downloadLink : downloadLocation;

export default download;
