import tag from 'lean-tag';
import { getUserMedia } from './utils';
import config from './config';

const ratio = 0.75;
const container = document.body;

const { width: { value: width } } = config;

const videoElement = tag('video', {
  width,
  height: Math.round(width * ratio)
});

container.appendChild(videoElement);

getUserMedia().then((videoStream) => {
  videoElement.srcObject = videoStream;
  videoElement.onloadedmetadata = function onloadedmetadata() {
    videoElement.play();
  };
});
