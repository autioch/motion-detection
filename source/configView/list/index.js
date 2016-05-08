import template from 'lodash.template';
import markup from './markup.html';
import capitalize from '../../utils/capitalize';
import delegate from '../../utils/delegate';
import './index.scss';

const compiledTemplate = template(markup);

export default function BooleanViewFactory(configStore, item) {

  let el = document.createElement('label');
  el.classList.add('controls__item');
  const method = configStore[`set${capitalize(item.key)}`];

  delegate(el, 'change', `.js-${item.key}`, ev => method(ev.target.value));

  function render() {
    el.innerHTML = compiledTemplate(item);
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
