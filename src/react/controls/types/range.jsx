import { h } from 'preact';

export default function RangeControl({ item: { key, min, max }, value, onChange }) {
  return (
    <div>
      <div class="control-item__range-values">
        <span class="control-item__range-min">{min}</span>
        <span class="control-item__range-value">{value}</span>
        <span class="control-item__range-max">{max}</span>
      </div>
      <input
        className="controls__input--range"
        type="range"
        min={min}
        max={max}
        value={value}
        onchange={(ev) => onChange(key, parseInt(ev.target.value, 10))}
      />
    </div>
  );
}
