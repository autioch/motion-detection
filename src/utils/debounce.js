export default function debounce(func, wait = 50, context = null) {
  let timeout;

  return function debounced() {
    const later = () => {
      timeout = null;
      func.apply(context, arguments);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
