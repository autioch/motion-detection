import BooleanView from './boolean';
import ListView from './list';
import RangeView from './range';
import ColorView from './color';
import './styles';

const types = {
  'boolean': BooleanView,
  range: RangeView,
  list: ListView,
  color: ColorView
};

export default function controlFactory(control, onChange) {
  return types[control.type](control, onChange);
}
