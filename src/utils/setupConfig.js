import debounce from './debounce';

const debounceDelay = 100;

export default function setupConfig(config, changeCallback) {
  const debouncedChangeCallback = debounce(changeCallback, debounceDelay);

  Object.keys(config).forEach((key) => {
    const configItem = config[key];

    configItem.key = key;
    let currentValue = configItem.defaultValue;

    Object.defineProperty(configItem, 'value', {
      get() {
        return currentValue;
      },
      set(newValue) {
        currentValue = newValue;
        debouncedChangeCallback();
      },
      enumerable: true,
      configurable: false
    });
  });
}
