import {
  SET_VIDEO_STREAM,
  CHANGE_SETTING
} from './actionTypes';

export function setVideoStream(videoStream) {
  return {
    type: SET_VIDEO_STREAM,
    payload: {
      videoStream
    }
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
