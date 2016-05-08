import './index.scss';
import template from 'lodash.template';
import markup from './markup.html';
import capitalize from '../../utils/capitalize';
import delegate from '../../utils/delegate';

const compiledTemplate = template(markup);

export default function BooleanViewFactory(configStore, item) {

  let el = document.createElement('label');
  let valueEl;
  el.classList.add('controls__item');
  const method = configStore[`set${capitalize(item.key)}`];

  delegate(el, 'change', `.js-${item.key}`, function(ev) {
    const value = ev.target.value;
    valueEl.textContent = value;
    method(value);
  });

  function render() {
    el.innerHTML = compiledTemplate(item);
    valueEl = el.querySelector(`.js-${item.key}-value`);
  }

  function exit() {
    el.remove();
  }

  const watchItems = {};
  watchItems[item.key] = render;

  return {
    el,
    render,
    exit
  };

}
