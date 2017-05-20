import getDimensions from './getDimensions';
import schema from './schema';

const { minWidth, maxWidth, minHeight, maxHeight, width, height } = getDimensions();

schema.width.min = minWidth;
schema.width.max = maxWidth;
schema.width.value = width;
schema.height.min = minHeight;
schema.height.max = maxHeight;
schema.height.value = height;

function setConfig(dict, key) {
  schema[key].key = key;
  dict[key] = schema[key].value;

  return dict;
}

const config = Object.keys(schema).reduce(setConfig, {});

export {
  schema,
  config
};
