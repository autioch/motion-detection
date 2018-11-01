/* eslint no-use-before-define: 0 */
import tag from 'lean-tag';

export default function RangeControl(control, onChange) {
  const valueEl = tag('span.control-item__range-value', control.value);
  const inputEl = tag('input.controls__input--range', {
    type: 'range',
    min: control.min,
    max: control.max,
    value: control.value,
    onchange: syncChange
  });

  function syncChange() {
    const value = parseInt(inputEl.value, 10);

    valueEl.textContent = value;

    onChange(control.key, value);
  }

  const el = tag('.controls__input--range', [
    tag('.control-item__range-values', [
      tag('span.control-item__range-min', control.min),
      valueEl,
      tag('span.control-item__range-max', control.max)
    ]),
    inputEl
  ]);

  return {
    el
  };
}
