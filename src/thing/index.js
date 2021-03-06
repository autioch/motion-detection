import downloadCanvasScreenshot from './downloadCanvasScreenshot';
import getDimensions from './getDimensions';
import getUserMedia from './getUserMedia';
import getVideoFrameGetter from './getVideoFrameGetter';
import getDifferenceRect from './getDifferenceRect';

const { width, height } = getDimensions();
const videoFrameGetter = getVideoFrameGetter(width, height);

let videoStream;

let videoElement;

let backgroundFrame;

function setVideoStream(newVideoStream) {
  videoStream = newVideoStream; // eslint-disable-line no-unused-vars
}

function setVideoElement(newVideoElement) {
  videoElement = newVideoElement;
  backgroundFrame = videoFrameGetter(videoElement);
}

function takeScreenshort() {
  videoFrameGetter(videoElement);

  downloadCanvasScreenshot(videoFrameGetter.canvas);
}

function setBackgroundFrame() {
  backgroundFrame = videoFrameGetter(videoElement);
}

function getDiff() {
  const currentFrame = videoFrameGetter(videoElement);
  const diff = getDifferenceRect(backgroundFrame, currentFrame, width, height);

  backgroundFrame = currentFrame;

  return diff;
}

const thing = {
  setVideoElement,
  setVideoStream,
  takeScreenshort,
  setBackgroundFrame,
  getDimensions,
  getUserMedia,
  getDiff
};

export default thing;
