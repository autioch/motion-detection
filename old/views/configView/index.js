import tag from 'lean-tag';
import listView from './list';
import rangeView from './range';
import booleanView from './boolean';
import './index';

const views = {
  'boolean': booleanView,
  range: rangeView,
  list: listView
};

export default function ControlViewFactory(config) {
  const controls = Object
    .keys(config)
    .map((key) => config[key])
    .map((item) => views[item.type](config, item));

  const el = tag('div', controls.map((controlView) => controlView.el));

  return {
    el
  };
}
