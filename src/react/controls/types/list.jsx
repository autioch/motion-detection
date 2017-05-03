import { h } from 'preact';

export default function BooleanControl({ item: { key, options }, value: selected, onChange }) {
  return (
    <select className="controls__input--list" onchange={(ev) => onChange(key, ev.target.value)}>
      {options.map(({ value, label }) => (<option value={value} selected={value === selected}>{label}</option>))}
    </select>
  );
}
