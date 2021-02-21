import {
  DATA_SET
} from './actionTypes';

export function actionDataSet(data) {
  return {
    type: DATA_SET,
    payload: {
      data
    }
  };
}
