/* eslint-disable max-len */
import downloadCanvasScreenshot from './downloadCanvasScreenshot';
import getDimensions from './getDimensions';
import getUserMedia from './getUserMedia';
import getVideoFrameGetter from './getVideoFrameGetter';
import getDifferencePixel from './getDifferencePixel';
import getDifferenceRect from './getDifferenceRect';
import getStreamRecorder from './getStreamRecorder';
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

let streamRecorder;

function setVideoStream(newVideoStream) {
  videoStream = newVideoStream; // eslint-disable-line no-unused-vars
  streamRecorder = getStreamRecorder(videoStream);
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

function fixRect(diff) {
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

function handleRecording(recordMotion, isChanged, recordMotionPauseTolerance) {
  if (recordMotion) {
    if (isChanged) {
      streamRecorder.startRecording(recordMotionPauseTolerance);
    } else {
      streamRecorder.stopRecording();
    }
  } else {
    streamRecorder.stopRecording(true);
  }
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
    diff = fixRect(diff);
  }

  return diff;
}

function toggleRecording() {
  streamRecorder.toggleRecording();
}

function updateDiffCanvas(canvas, motionColor, comparisonMode, recordMotion, recordMotionPauseTolerance, colorNoiseTolerance, comparisonImage) {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  const rgbaColor = `rgba(${motionColor.R}, ${motionColor.G}, ${motionColor.B}, 0.5)`;
  const diff = getDiff(colorNoiseTolerance, comparisonImage, comparisonMode);

  context.fillStyle = rgbaColor;
  context.clearRect(0, 0, getDimensions().width, getDimensions().height);

  if (comparisonMode === COMPARISON_MODE.SINGLE_RECT) {
    context.fillRect(diff.top, diff.left, diff.width, diff.height);
  } else {
    const { pixels } = diff;

    for (let index = 0; index < pixels.length; index = index + 2) {
      context.fillRect(pixels[index], pixels[index + 1], originaWidthModifier, originaHeightModifier); // 10 should be quality
    }
  }

  handleRecording(recordMotion, diff.isChanged, recordMotionPauseTolerance);
}

const core = {
  setVideoElement,
  setVideoStream,
  takeScreenshort,
  setBackgroundFrame,
  setComparisonQuality,
  getDimensions,
  getUserMedia,
  getDiff,
  handleRecording,
  toggleRecording,
  updateDiffCanvas
};

export default core;
