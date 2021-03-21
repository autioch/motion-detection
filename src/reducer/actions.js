import {
  SET_COMPARISON_QUALITY,
  CHANGE_SETTING,
  SET_BACKGROUND_FRAME,
  TAKE_SCREENSHOT,
  TOGGLE_RECORDING,
  INITIATE_CORE
} from './actionTypes';

export function setComparisonQuality(comparisonQuality) {
  return {
    type: SET_COMPARISON_QUALITY,
    payload: {
      comparisonQuality
    }
  };
}

export function setBackgroundFrame() {
  return {
    type: SET_BACKGROUND_FRAME
  };
}

export function changeSetting(key, value) {
  return {
    type: CHANGE_SETTING,
    payload: {
      key,
      value
    }
  };
}

export function takeScreenshot() {
  return {
    type: TAKE_SCREENSHOT
  };
}

export function toggleRecording() {
  return {
    type: TOGGLE_RECORDING
  };
}

export function initiateCore(videoElement, videoStream) {
  return {
    type: INITIATE_CORE,
    payload: {
      videoElement,
      videoStream
    }
  };
}
