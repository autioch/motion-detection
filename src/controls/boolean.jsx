import { h } from 'preact';

export default function BooleanControl({ item: { key, label, value } }) {
  console.log(arguments);
  const onChange = (ev) => console.log(ev, key);

  return (
    <label className="controls__item">
      <input className="controls__input--boolean" type="checkbox" checked={!!value} onchange={onChange}/>
      <span className="controls__label--boolean">{label}</span>
    </label>
  );
}
