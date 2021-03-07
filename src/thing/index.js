import downloadCanvasScreenshot from './downloadCanvasScreenshot';
import getDimensions from './getDimensions';
import getUserMedia from './getUserMedia';
import getVideoFrameGetter from './getVideoFrameGetter';
import getDifferenceRect from './getDifferenceRect';
import { MAX_COMPARISON_QUALITY } from '../consts';

const { width, height } = getDimensions();

let videoFrameGetter;

let videoStream;

let videoElement;

let backgroundFrame;

let comparisonQuality;

let compareWidth;

let compareHeight;

let originaWidthModifier = 1;

let originaHeightModifier = 1;

function setVideoStream(newVideoStream) {
  videoStream = newVideoStream; // eslint-disable-line no-unused-vars
}

function setVideoElement(newVideoElement) {
  videoElement = newVideoElement;
  if (videoFrameGetter) {
    backgroundFrame = videoFrameGetter(videoElement);
  }
}

function takeScreenshort() {
  videoFrameGetter(videoElement);

  downloadCanvasScreenshot(videoFrameGetter.canvas);
}

function setBackgroundFrame() {
  backgroundFrame = videoFrameGetter(videoElement);
}

function setComparisonQuality(newComparisonQuality) {
  comparisonQuality = newComparisonQuality;
  compareWidth = Math.floor((width * comparisonQuality) / MAX_COMPARISON_QUALITY);
  compareHeight = Math.floor((height * comparisonQuality) / MAX_COMPARISON_QUALITY);
  originaWidthModifier = Math.floor(width / compareWidth);
  originaHeightModifier = Math.floor(height / compareHeight);

  videoFrameGetter = getVideoFrameGetter(compareWidth, compareHeight);

  setBackgroundFrame();
}

function getDiff(colorNoiseTolerance) {
  const currentFrame = videoFrameGetter(videoElement);
  const diff = getDifferenceRect(backgroundFrame, currentFrame, compareWidth, compareHeight, colorNoiseTolerance);

  backgroundFrame = currentFrame;

  // todo
  return {
    top: Math.floor(diff.top * originaHeightModifier),
    left: Math.floor(diff.left * originaWidthModifier),
    bottom: Math.floor(diff.bottom * originaHeightModifier),
    right: Math.floor(diff.right * originaWidthModifier),
    width: Math.floor(diff.width * originaWidthModifier),
    height: Math.floor(diff.height * originaHeightModifier),
    isChanged: diff.isChanged
  };
}

const thing = {
  setVideoElement,
  setVideoStream,
  takeScreenshort,
  setBackgroundFrame,
  setComparisonQuality,
  getDimensions,
  getUserMedia,
  getDiff
};

export default thing;
