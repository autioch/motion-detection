import capitalize from '../utils/capitalize';
import fireCallbacks from './fireCallbacks';

export default function setupBoolean(store, key, item) {
  const capitalized = capitalize(key);
  const callbacks = [];

  store[`get${capitalized}`] = function() {
    return item.value;
  };

  store[`toggle${capitalized}`] = function(value) {
    if (value !== undefined) {
      item.value = value;
    } else {
      item.value = !item.value;
    }
    fireCallbacks(callbacks, store.serialize());
    return store;
  };

  store[`on${capitalized}`] = function(callback) {
    callbacks.push(callback);
    return store;
  };
}
