import capitalize from '../utils/capitalize';
import fireCallbacks from './fireCallbacks';

export default function setupList(store, key, item) {
  const capitalized = capitalize(key);
  const callbacks = [];

  store[`get${capitalized}`] = function() {
    return item.value;
  };

  store[`set${capitalized}`] = function(value) {
    item.value = value;
    fireCallbacks(callbacks, store.serialize());

    return store;
  };

  store[`on${capitalized}`] = function(callback) {
    callbacks.push(callback);

    return store;
  };
}
