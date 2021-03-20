// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) { // eslint-disable-line func-names
    // First get ahold of the legacy getUserMedia, if present
    const getUserMediaPrefixed = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMediaPrefixed) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise((resolve, reject) => {
      getUserMediaPrefixed.call(navigator, constraints, resolve, reject);
    });
  };
}

export default function getUserMedia() {
  return navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });
}

// navigator.mediaDevices.getUserMedia({
//   audio: true,
//   video: true
// })
//   .then((stream) => {
//     const video = document.querySelector('video');
//
//     // Older browsers may not have srcObject
//
//     if ('srcObject' in video) {
//       video.srcObject = stream;
//     } else {
//     // Avoid using this in new browsers, as it is going away.
//       video.src = window.URL.createObjectURL(stream);
//     }
//     video.onloadedmetadata = () => video.play();
//   })
//   .catch((err) => {
//     console.log(`${err.name}: ${err.message}`);
//   });

// const mediaConstraints = {
//   autio: true,
//   video: true
// };
//
// function streamToUrl(resolve) {
//   return (stream) => resolve((window.URL || window.webkitURL).createObjectURL(stream));
// }
//
// export default function getUserMedia() {
//   if (navigator.mediaDevices.getUserMedia) {
//     return navigator.mediaDevices.getUserMedia(mediaConstraints);
//   }
//   if (navigator.getUserMedia) {
//     return new Promise((resolve, reject) => navigator.getUserMedia(mediaConstraints, resolve, reject));
//   }
//   if (navigator.webkitGetUserMedia) {
//     return new Promise((resolve, reject) => navigator.webkitGetUserMedia(mediaConstraints, streamToUrl, reject));
//   }
//   if (navigator.mozGetUserMedia) {
//     return new Promise((resolve, reject) => navigator.mozGetUserMedia(mediaConstraints, streamToUrl, reject));
//   }
//
//   return Promise.reject(new Error('Can not get user media.'));
// }
