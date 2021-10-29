import {
  SET_BACKGROUND_FRAME,
  SET_COMPARISON_QUALITY,
  CHANGE_SETTING,
  TAKE_SCREENSHOT,
  TOGGLE_RECORDING,
  SETUP_VIDEO
} from './actionTypes';
import core from '../core';
import { download } from '../utils';

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
      core.setCurrentFrame();

      return state;
    }

    case SET_COMPARISON_QUALITY: {
      const { comparisonQuality } = payload;

      core.setComparisonQuality(comparisonQuality);

      return state;
    }

    case TAKE_SCREENSHOT: {
      const { videoWidth, videoHeight, videoCanvas, videoElement, videoContext } = state;

      const serializedDate = new Date().toJSON();
      const timestamp = serializedDate.replace('T', ' ').replace('Z', '');
      const filename = `motion\\screenshot-${timestamp}.png`;

      videoContext.clearRect(0, 0, videoWidth, videoHeight);
      videoContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

      videoCanvas.toBlob((blob) => download(blob, filename));

      return state;
    }

    case TOGGLE_RECORDING: {
      core.toggleRecording();

      return state;
    }

    case SETUP_VIDEO : {
      const { videoElement, videoStream } = payload;
      const { videoWidth, videoHeight, comparisonQuality } = state;
      const videoCanvas = document.createElement('canvas');
      const videoContext = videoCanvas.getContext('2d');

      videoCanvas.width = videoWidth;
      videoCanvas.height = videoHeight;

      core.setupVideo(videoElement, videoStream, videoHeight, videoWidth, comparisonQuality);

      return {
        ...state,
        videoElement,
        videoStream,
        videoCanvas,
        videoContext
      };
    }

    default:
      return state;
  }
}
