import matches from './matches';

export default function delegate(el, eventName, delegate, handler, context) {
  context = context || null;
  el.addEventListener(eventName, function(ev) {
    if (matches(ev.target, delegate)) {
      handler.call(context, ev);
    }
  });
  return el;
}

