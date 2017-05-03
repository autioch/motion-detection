const mediaConstraints = {
  video: true
};

function streamToUrl(resolve) {
  return (stream) => resolve((window.URL || window.webkitURL).createObjectURL(stream));
}

export default function getUserMedia() {
  if (navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(mediaConstraints);
  }
  if (navigator.getUserMedia) {
    return new Promise((resolve, reject) => navigator.getUserMedia(mediaConstraints, resolve, reject));
  }
  if (navigator.webkitGetUserMedia) {
    return new Promise((resolve, reject) => navigator.webkitGetUserMedia(mediaConstraints, streamToUrl, reject));
  }
  if (navigator.mozGetUserMedia) {
    return new Promise((resolve, reject) => navigator.mozGetUserMedia(mediaConstraints, streamToUrl, reject));
  }

  return Promise.reject(Error('Can not get user media.'));
}
