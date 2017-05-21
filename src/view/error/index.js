import tag from 'lean-tag';
import './styles';

/* eslint max-params: 0 */
/* eslint no-undefined: 0 */

export default function errorLogger() {
  const messageEl = tag();
  const stackEl = tag();
  const el = tag('.error-log', messageEl, stackEl);

  function captureError(message, url, lineNo, columnNo, error) { // eslint-disable-line no-unused-vars
    messageEl.textContent = `${message} (line ${lineNo}, col ${columnNo})`;
    stackEl.textContent = error && error !== null && error !== undefined && error.stack ? error.stack : '';
  }

  window.onerror = captureError;

  return {
    el
  };
}
