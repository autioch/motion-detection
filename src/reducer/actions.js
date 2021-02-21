import {
  TAKE_SCREENSHOT,
  SET_BACKGROUND_FRAME,
  SET_VIDEO_STREAM
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

export function setVideoStream(videoStream) {
  return {
    type: SET_VIDEO_STREAM,
    payload: {
      videoStream
    }
  };
}
