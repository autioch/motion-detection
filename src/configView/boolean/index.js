import './index.scss';

// import template from 'lodash.template';

// import markup from './markup.html';
import capitalize from '../../utils/capitalize';
import delegate from '../../utils/delegate';

const compiledTemplate = template(markup);

export default function BooleanViewFactory(configStore, item) {
  const el = document.createElement('label');

  el.classList.add('controls__item');
  const method = configStore[`toggle${capitalize(item.key)}`];

  delegate(el, 'change', `.js-${item.key}`, (ev) => method(ev.target.checked));

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
