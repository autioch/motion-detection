import tag from 'lean-tag';
import controlFactory from './types';

export default function controlsView(controls, onChange) {
  const items = controls
  .filter((control) => !control.hidden)
  .map((control) => tag(`label.control-item.control-item--${control.type}`, [
    tag('span.control-item__label', control.label),
    controlFactory(control, onChange).el
  ]));

  const el = tag('.controls', items);

  return {
    el
  };
}
