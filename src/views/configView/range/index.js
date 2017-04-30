import tag from 'lean-tag';
import './style';

export default function rangeViewFactory(configStore, item) {
  const valueEl = tag(`span.controls__value--range js-${item.key}-value`, configStore[item.key].value);
  const el = tag('label.controls__item', [
    tag('div.controls__label--range', [item.label, valueEl]),
    tag('input.controls__input--range', {
      type: 'range',
      min: item.min,
      max: item.max,
      value: item.value,
      onchange(ev) {
        const { value } = ev.target;

        valueEl.textContent = value;
        configStore[item.key].value = value;
      }
    })
  ]);

  return {
    el
  };
}
