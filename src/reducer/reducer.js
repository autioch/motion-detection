import {
  TAKE_SCREENSHOT,
  SET_BACKGROUND_FRAME
} from './actionTypes';

import core from '../core';

export function reducer(state, action) { // eslint-disable-line max-statements
  const { type, payload } = action; // eslint-disable-line no-unused-vars

  switch (type) {
    case TAKE_SCREENSHOT: {
      core.takeScreenshot();

      // TODO Notify user somehow?
      return state;
    }

    case SET_BACKGROUND_FRAME: {
      core.setBackgroundFrame();

      // TODO Notify user somehow?
      return state;
    }

    default:
      return state;
  }
}
