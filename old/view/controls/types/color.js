import tag from 'lean-tag';

export default function BooleanControl(control, onChange) {
  const el = tag('input.controls__input--color', {
    type: 'color',
    value: control.value,
    onchange: (ev) => onChange(control.key, ev.target.value)
  });

  return {
    el
  };
}
