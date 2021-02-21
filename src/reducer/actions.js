import {
  TAKE_SCREENSHOT,
  SET_BACKGROUND_FRAME
} from './actionTypes';

export function takeScreenshort() {
  return {
    type: TAKE_SCREENSHOT,
    payload: {}
  };
}

export function setBackgroundFrame() {
  return {
    type: SET_BACKGROUND_FRAME,
    payload: {}
  };
}
