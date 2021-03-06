import {
  SET_VIDEO_STREAM,
  CHANGE_SETTING
} from './actionTypes';

export function reducer(state, action) { // eslint-disable-line max-statements
  const { type, payload } = action; // eslint-disable-line no-unused-vars

  switch (type) {
    case SET_VIDEO_STREAM: {
      const { videoStream } = payload;

      return {
        ...state,
        videoStream
      };
    }

    case CHANGE_SETTING: {
      const { key, value } = payload;

      return {
        ...state,
        [key]: value
      };
    }

    default:
      return state;
  }
}
