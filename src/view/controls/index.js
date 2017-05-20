import tag from 'lean-tag';
import controlFactory from './types';
import './styles';

export default function controlsView(controls, onChange) {
  const items = controls.map((control) => tag('label.control-item', [
    tag('span.control-item__label', control.label),
    controlFactory(control, onChange).el
  ]));

  const el = tag('.controls', items);

  return {
    el
  };
}
