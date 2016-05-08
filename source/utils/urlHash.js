const SEPARATOR = ';';
const EQUAL = '=';

function toHash(item) {
  return encodeURIComponent(item);
}

function fromHash(item) {
  return decodeURIComponent(item);
}

function parse(hash) {
  return hash.split(SEPARATOR).reduce(function(config, item) {
    const [key, value] = item.split(EQUAL);
    let parsedValue = fromHash(value);
    if (parsedValue === 'true') {
      parsedValue = true;
    } else if (parsedValue === 'false') {
      parsedValue = false;
    } else {
      parsedValue = parseInt(parsedValue, 10);
    }
    config[fromHash(key)] = parsedValue;
    return config;
  }, {});
}

function serialize(config) {
  return Object.keys(config).map(function(item) {
    return toHash(item) + EQUAL + toHash(config[item]);
  }).join(SEPARATOR);
}

export function getData() {
  return window.location.hash ? parse(window.location.hash.slice(1)) : {};
}

export function setData(config) {
  window.location.hash = serialize(config);
}
