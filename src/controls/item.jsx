import { h } from 'preact';
import BooleanView from './boolean';

const types = {
  'boolean': BooleanView,
  range: BooleanView,
  list: BooleanView
};

export default function ControlItemView(control) {
  const Component = types[control.type];

  return (<Component item={control} key={control.key}/>);
}
