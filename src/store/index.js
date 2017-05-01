import { debounce } from '../utils';
import stateValidator from './stateValidator';
import stateBuilder from './stateBuilder';

export default function storeFactory(initialState) {
  const subscribers = [];
  let actionQueue = [];
  let state = initialState;
  let inLoop = false;

  const validateState = stateValidator(initialState);
  const buildState = stateBuilder(validateState);

  const actionLoop = debounce(() => {
    inLoop = true;
    while (actionQueue.length) {
      const currentActions = actionQueue;

      actionQueue = [];
      state = currentActions.reduce(buildState, state);
    }

    subscribers.forEach((subsciber) => subsciber(state));
    inLoop = false;
  }, 0);

  return {
    dispatch(action) {
      actionQueue.push(action);
      if (!inLoop) {
        actionLoop();
      }
    },
    subscribe(callback) {
      subscribers.push(callback);
    },
    unsubscribe(callback) {
      const index = subscribers.indexOf(callback);

      if (index > -1) {
        subscribers.splice(index, 1);
      }
    }
  };
}
