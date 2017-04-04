import tag from 'lean-tag';
import './index';
import capitalize from '../../utils/capitalize';

export default function boleanViewFactory(configStore, item) {
  const el = tag('label.controls__item', [
    tag(`input.controls__input--boolean.js-${item.key}`, {
      type: 'checkbox',
      checked: !!item.value,
      onchange: (ev) => configStore[`toggle${capitalize(item.key)}`](ev.target.checked)
    }),
    tag('span.controls__label--boolean', item.label)
  ]);

  return {
    el
  };
}
