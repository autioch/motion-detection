import tag from 'lean-tag';
import './style';

export default function boleanViewFactory(configStore, item) {
  const el = tag('label.controls__item', [
    tag('input.controls__input--boolean', {
      type: 'checkbox',
      checked: !!item.value,
      onchange(ev) {
        configStore[item.key].value = ev.target.checked;
      }
    }),
    tag('span.controls__label--boolean', item.label)
  ]);

  return {
    el
  };
}
