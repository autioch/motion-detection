import getWidthOption from './getWidthOption';
import schema from './schema';

const { min, max } = getWidthOption();

schema.width.min = min;
schema.width.max = max;
schema.width.value = 320;

schema.height.min = min;
schema.height.max = max;
schema.height.value = min * 2;

Object.keys(schema).forEach((key) => {
  schema[key].key = key;
});

export default schema;
