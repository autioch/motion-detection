import {
  SET_BACKGROUND_FRAME,
  SET_COMPARISON_QUALITY,
  CHANGE_SETTING,
  TAKE_SCREENSHOT,
  TOGGLE_RECORDING,
  INITIATE_CORE
} from './actionTypes';
import core from '../core';

export function reducer(state, action) { // eslint-disable-line max-statements
  const { type, payload } = action; // eslint-disable-line no-unused-vars

  switch (type) {
    case CHANGE_SETTING: {
      const { key, value } = payload;

      return {
        ...state,
        [key]: value
      };
    }

    case SET_BACKGROUND_FRAME: {
      core.setBackgroundFrame();

      return state;
    }

    case SET_COMPARISON_QUALITY: {
      const { comparisonQuality } = payload;

      core.setComparisonQuality(comparisonQuality);

      return state;
    }

    case TAKE_SCREENSHOT: {
      core.takeScreenshot();

      return state;
    }

    case TOGGLE_RECORDING: {
      core.toggleRecording();

      return state;
    }

    case INITIATE_CORE : {
      const { videoElement, videoStream } = payload;
      const { comparisonQuality } = state;

      core.setVideoElement(videoElement);
      core.setComparisonQuality(comparisonQuality);
      core.setVideoStream(videoStream);

      return {
        ...state,
        videoStream
      };
    }

    default:
      return state;
  }
}
