import tag from 'lean-tag';
import capitalize from '../../utils/capitalize';
import './index';

export default function rangeViewFactory(configStore, item) {
  const valueEl = tag(`span.controls__value--range js-${item.key}-value`);
  const el = tag('label.controls__item', [
    tag('div.controls__label--range', [item.label, valueEl]),
    tag(`input.controls__input--range js-${item.key}`, {
      type: 'range',
      min: item.min,
      max: item.max,
      value: item.value,
      onchange(ev) {
        const { value } = ev.target;

        valueEl.textContent = value;
        configStore[`set${capitalize(item.key)}`](value);
      }
    })
  ]);

  return {
    el
  };
}
