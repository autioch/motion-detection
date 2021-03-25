/* eslint-disable max-len */
import getStreamRecorder from './getStreamRecorder';
import getDifferencePixel from './getDifferencePixel';
import getDifferenceRect from './getDifferenceRect';
import { MAX_COMPARISON_QUALITY, COMPARISON_IMAGE, COMPARISON_MODE } from '../consts';

let videoWidth;

let videoHeight;

let videoStream;

let videoElement;

let backgroundFrame;

let comparisonQuality;

let compareWidth;

let compareHeight;

let originaWidthModifier = 1;

let originaHeightModifier = 1;

let streamRecorder;

const videoFrameCanvas = document.createElement('canvas');
const videoFrameContext = videoFrameCanvas.getContext('2d');

function getVideoFrame() {
  videoFrameContext.clearRect(0, 0, compareWidth, compareHeight);
  videoFrameContext.drawImage(videoElement, 0, 0, compareWidth, compareHeight);

  return videoFrameContext.getImageData(0, 0, compareWidth, compareHeight).data;
}

function setBackgroundFrame() {
  backgroundFrame = getVideoFrame();
}

function setComparisonQuality(newComparisonQuality) {
  comparisonQuality = newComparisonQuality;
  compareWidth = Math.floor((videoWidth * comparisonQuality) / MAX_COMPARISON_QUALITY);
  compareHeight = Math.floor((videoHeight * comparisonQuality) / MAX_COMPARISON_QUALITY);
  originaWidthModifier = Math.floor(videoWidth / compareWidth);
  originaHeightModifier = Math.floor(videoHeight / compareHeight);

  videoFrameCanvas.width = compareWidth;
  videoFrameCanvas.height = compareHeight;

  setBackgroundFrame(); // todo - only when previous
}

function toggleRecording() {
  streamRecorder.toggleRecording();
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

function updateDiffCanvas(canvas, motionColor, comparisonMode, recordMotion, recordMotionPauseTolerance, colorNoiseTolerance, comparisonImage) {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  const rgbaColor = `rgba(${motionColor.R}, ${motionColor.G}, ${motionColor.B}, 0.5)`;
  const currentFrame = getVideoFrame();
  const diffMethod = comparisonMode === COMPARISON_MODE.SINGLE_RECT ? getDifferenceRect : getDifferencePixel;
  const diff = diffMethod(backgroundFrame, currentFrame, compareWidth, compareHeight, colorNoiseTolerance, originaWidthModifier, originaHeightModifier);

  if (comparisonImage === COMPARISON_IMAGE.PREVIOUS) {
    backgroundFrame = currentFrame;
  }

  context.fillStyle = rgbaColor;
  context.clearRect(0, 0, videoWidth, videoHeight);

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

function setupVideo(newVideoElement, newVideoStream, newVideoHeight, newVideoWidth, comparisonQuality2) {
  videoWidth = newVideoWidth;
  videoHeight = newVideoHeight;
  videoElement = newVideoElement;
  videoStream = newVideoStream;

  setComparisonQuality(comparisonQuality2);

  backgroundFrame = getVideoFrame();
  streamRecorder = getStreamRecorder(videoStream);
}

const core = {
  setBackgroundFrame,
  setComparisonQuality,
  setupVideo,
  toggleRecording,
  updateDiffCanvas
};

export default core;
