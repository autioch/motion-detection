import capitalize from '../utils/capitalize';
import keepInRange from '../utils/keepInRange';
import fireCallbacks from './fireCallbacks';

export default function setupRange(store, key, item) {
  const capitalized = capitalize(key);
  const boundKeepInRange = keepInRange.bind(null, item.min, item.max);
  const callbacks = [];

  store[`get${capitalized}`] = function() {
    return item.value;
  };

  store[`set${capitalized}`] = function(value) {
    item.value = boundKeepInRange(value);
    fireCallbacks(callbacks, store.serialize());
    return store;
  };

  store[`on${capitalized}`] = function(callback) {
    callbacks.push(callback);
    return store;
  };

}
