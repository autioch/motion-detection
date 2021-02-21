import {
  DATA_SET
} from './actionTypes';

export function reducer(state, action) { // eslint-disable-line max-statements
  const { type, payload } = action;

  switch (type) {
    case DATA_SET: {
      const { data } = payload;

      return {
        ...state,
        ...data
      };
    }

    default:
      return state;
  }
}
