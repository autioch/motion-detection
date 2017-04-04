const windowURL = window.URL || window.webkitURL;
const mediaConstraints = {
  video: true
};

function promiseMedia() {
  if (navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(mediaConstraints);
  }
  if (navigator.getUserMedia) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(mediaConstraints, resolve, reject);
    });
  }
  if (navigator.webkitGetUserMedia) {
    return new Promise((resolve, reject) => {
      navigator.webkitGetUserMedia(mediaConstraints, (stream) => {
        resolve(windowURL.createObjectURL(stream));
      }, (err) => {
        reject(err);
      });
    });
  }
  if (navigator.mozGetUserMedia) {
    return new Promise((resolve, reject) => {
      navigator.mozGetUserMedia(mediaConstraints, (stream) => {
        resolve(windowURL.createObjectURL(stream));
      }, reject);
    });
  }

  return Promise.reject(Error('Can not get user media.'));
}

export function getUserMedia() {
  return promiseMedia().then((stream) => stream, (err) => {
    document.body.appendChild(document.createTextNode(`Failed to get media ${err.message}`));

    return Promise.reject(err);
  });
}
