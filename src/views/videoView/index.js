import tag from 'lean-tag';

const ratio = 0.75;

export default function videoViewFactory(config) {
  const { width: { value: width } } = config;

  const videoElement = tag('video', {
    width,
    height: Math.round(width * ratio)
  });

  function play(videoStream) {
    videoElement.srcObject = videoStream;
    videoElement.onloadedmetadata = function onloadedmetadata() {
      videoElement.play();
    };
  }

  return {
    el: videoElement,
    play
  };
}
