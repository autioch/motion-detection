import capitalize from '../utils/capitalize';
import setupBoolean from './setupBoolean';
import setupRange from './setupRange';
import setupList from './setupList';

const setups = {
  boolean: setupBoolean,
  range: setupRange,
  list: setupList
};

export default function ConfigStoreFactory(config) {

  const store = {
    get(item) {
      return config[item];
    },
    serialize() {
      return Object.keys(config).reduce(function(dict, key) {
        dict[key] = config[key].value;
        return dict;
      }, {});
    },
    forEach(callback, context) {
      context = context || null;
      Object.keys(config).forEach(function(key) {
        callback.call(context, config[key], key);
      });
      return store;
    }
  };

  store.bind = function bind(component) {
    Object.keys(component.watch).forEach(function(item) {
      store[`on${capitalize(item)}`](component.watch[item]);
    });
    component.api.init(store.serialize());
    return component.api;
  };

  Object.keys(config).forEach(function(key) {
    const item = config[key];
    item.key = key;
    setups[item.type](store, key, item);
  });
  return store;
}
