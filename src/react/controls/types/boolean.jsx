import { h } from 'preact';

export default function BooleanControl({ item: { key }, value, onChange }) {
  return (
    <input
      className="controls__input--boolean"
      type="checkbox"
      checked={value}
      onchange={(ev) => onChange(key, ev.target.checked)}
    />
  );
}
