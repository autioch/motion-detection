import getWidthOption from './getWidthOption';
import schema from './schema';

const { min, max } = getWidthOption();

schema.width.min = min;
schema.width.max = max;
schema.width.value = max;

schema.height.min = min;
schema.height.max = max;
schema.height.value = max;

Object.keys(schema).forEach((key) => {
  schema[key].key = key;
});

export default schema;
