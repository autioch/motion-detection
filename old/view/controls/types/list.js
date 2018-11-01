import tag from 'lean-tag';

export default function ListControl(control, onChange) {
  const items = control.options.map(({ value, label }) => tag('option', label, {
    value,
    selected: value === control.value
  }));

  const el = tag('select.controls__input--list', items, {
    onchange: (ev) => onChange(control.key, ev.target.value)
  });

  return {
    el
  };
}
