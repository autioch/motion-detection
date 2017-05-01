import BooleanView from './boolean';
import ListView from './list';
import RangeView from './range';

const types = {
  'boolean': BooleanView,
  range: RangeView,
  list: ListView
};

export default function ControlFactory(control) {
  return types[control.type];
}
