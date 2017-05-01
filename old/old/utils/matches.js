export default function matches(el, selector) {
  return (el.matches || el.matchesSelector).call(el, selector);
}
