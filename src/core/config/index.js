import getWidthOption from './getWidthOption';
import schema from './schema';

const { min, max } = getWidthOption();
const RATIO = 0.75;

schema.width.min = min;
schema.width.max = max;
schema.width.value = max;
schema.height.min = min;
schema.height.max = max;
schema.height.value = Math.floor(schema.width.value * RATIO);

const config = Object.keys(schema).reduce((dict, key) => {
  schema[key].key = key;
  dict[key] = schema[key].value;

  return dict;
}, {});

export {
  schema,
  config
};
