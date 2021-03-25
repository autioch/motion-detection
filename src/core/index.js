/* eslint-disable max-len */
import getStreamRecorder from './getStreamRecorder';
import getDifferencePixel from './getDifferencePixel';
import getDifferenceRect from './getDifferenceRect';
import { MAX_COMPARISON_QUALITY, COMPARISON_IMAGE, COMPARISON_MODE } from '../consts';

let videoWidth;

let videoHeight;

let videoStream;

let videoElement;

let currentFrame;

let originaWidthModifier = 1;

let originaHeightModifier = 1;

let streamRecorder;

const videoFrameCanvas = document.createElement('canvas');
const videoFrameContext = videoFrameCanvas.getContext('2d');

function setCurrentFrame() {
  videoFrameContext.clearRect(0, 0, videoFrameCanvas.width, videoFrameCanvas.height);
  videoFrameContext.drawImage(videoElement, 0, 0, videoFrameCanvas.width, videoFrameCanvas.height);

  currentFrame = videoFrameContext.getImageData(0, 0, videoFrameCanvas.width, videoFrameCanvas.height).data;
}

function setComparisonQuality(newComparisonQuality) {
  const compareHeight = (videoHeight * newComparisonQuality) / MAX_COMPARISON_QUALITY;
  const compareWidth = (videoWidth * newComparisonQuality) / MAX_COMPARISON_QUALITY;

  originaWidthModifier = Math.floor(videoWidth / compareWidth);
  originaHeightModifier = Math.floor(videoHeight / compareHeight);

  videoFrameCanvas.width = Math.floor(compareWidth);
  videoFrameCanvas.height = Math.floor(compareHeight);

  setCurrentFrame(); // todo - only when previous
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

  function noticeablyDiffers(colorDiff) {
    return (colorDiff > colorNoiseTolerance) || (colorDiff < -colorNoiseTolerance);
  }

  const context = canvas.getContext('2d');
  const rgbaColor = `rgba(${motionColor.R}, ${motionColor.G}, ${motionColor.B}, 0.5)`;
  const previousFrame = currentFrame;

  setCurrentFrame();
  const diffMethod = comparisonMode === COMPARISON_MODE.SINGLE_RECT ? getDifferenceRect : getDifferencePixel;
  const diff = diffMethod(currentFrame, previousFrame, videoFrameCanvas.width, noticeablyDiffers);

  if (comparisonImage === COMPARISON_IMAGE.PREVIOUS) {
    currentFrame = previousFrame;
  }

  context.fillStyle = rgbaColor;
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (comparisonMode === COMPARISON_MODE.SINGLE_RECT) {
    context.fillRect(diff.top * originaHeightModifier, diff.left * originaWidthModifier, diff.width * originaWidthModifier, diff.height * originaHeightModifier);
  } else {
    const { pixels } = diff;

    for (let index = 0; index < pixels.length; index = index + 2) {
      context.fillRect((pixels[index] * originaWidthModifier) - 0.5, (pixels[index + 1] * originaHeightModifier) - 0.5, originaWidthModifier, originaHeightModifier);
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
  setCurrentFrame();
  streamRecorder = getStreamRecorder(videoStream);
}

const core = {
  setCurrentFrame,
  setComparisonQuality,
  setupVideo,
  toggleRecording,
  updateDiffCanvas
};

export default core;
