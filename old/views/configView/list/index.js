import tag from 'lean-tag';
import './style';

function getOptions(item) {
  const { value, options } = item;

  return options.map((option) => tag('option', option.label, {
    value: option.value,
    selected: option.value === value
  }));
}

export default function listViewFactory(configStore, item) {
  const el = tag('label.controls__item', [
    tag('span.controls__label--list', item.label),
    tag('select.controls__input--list', getOptions(item), {
      onchange(ev) {
        configStore[item.key].value = ev.target.value;
      }
    })
  ]);

  return {
    el
  };
}
