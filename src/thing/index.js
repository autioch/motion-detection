/* eslint-disable max-len */
import downloadCanvasScreenshot from './downloadCanvasScreenshot';
import getDimensions from './getDimensions';
import getUserMedia from './getUserMedia';
import getVideoFrameGetter from './getVideoFrameGetter';
import getDifferencePixel from './getDifferencePixel';
import getDifferenceRect from './getDifferenceRect';
import { MAX_COMPARISON_QUALITY, COMPARISON_IMAGE, COMPARISON_MODE } from '../consts';

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

function getDiff(colorNoiseTolerance, comparisonImage, comparisonMode) {
  const currentFrame = videoFrameGetter(videoElement);

  let diff;

  if (comparisonMode === COMPARISON_MODE.SINGLE_RECT) {
    diff = getDifferenceRect(backgroundFrame, currentFrame, compareWidth, compareHeight, colorNoiseTolerance);
  } else {
    diff = getDifferencePixel(backgroundFrame, currentFrame, compareWidth, compareHeight, colorNoiseTolerance, originaWidthModifier, originaHeightModifier);
  }

  if (comparisonImage === COMPARISON_IMAGE.PREVIOUS) {
    backgroundFrame = currentFrame;
  }

  if (comparisonMode === COMPARISON_MODE.SINGLE_RECT) {
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

  return diff;
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
