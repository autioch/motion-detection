import {
  TAKE_SCREENSHOT,
  SET_BACKGROUND_FRAME,
  SET_VIDEO_STREAM
} from './actionTypes';

import downloadCanvasScreenshot from '../core/downloadCanvasScreenshot';

export function reducer(state, action) { // eslint-disable-line max-statements
  const { type, payload } = action; // eslint-disable-line no-unused-vars

  switch (type) {
    case TAKE_SCREENSHOT: {
      downloadCanvasScreenshot();

      // TODO Notify user somehow?
      return state;
    }

    case SET_VIDEO_STREAM: {
      const { videoStream } = payload;

      return {
        ...state,
        videoStream
      };
    }

    case SET_BACKGROUND_FRAME: {
      // TODO Notify user somehow?
      return {
        ...state,
        backgroundFrame: ''
      };
    }

    default:
      return state;
  }
}
