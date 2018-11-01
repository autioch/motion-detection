import tag from 'lean-tag';

export default function BooleanControl(control, onChange) {
  const el = tag('input.controls__input--boolean', {
    type: 'checkbox',
    checked: control.value,
    onchange: (ev) => onChange(control.key, ev.target.checked)
  });

  return {
    el
  };
}
