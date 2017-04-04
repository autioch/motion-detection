import tag from 'lean-tag';

const TIME_LENGTH = 8;

export default function logViewFactory() {
  const el = tag();

  function log(...messages) {
    const time = new Date().toTimeString().substr(0, TIME_LENGTH);

    el.appendChild(tag('div', `${time} ${messages.join(', ')}`));
  }

  return {
    el,
    log
  };
}
