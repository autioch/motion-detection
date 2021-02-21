import { useState } from 'react';
import './index.scss';

export default function ErrorLog() {
  const [errorList, addError] = useState([]);

  function captureError(message, url, lineNo, columnNo, error) { // eslint-disable-line no-unused-vars, max-params
    const messageFull = `${message} (line ${lineNo}, col ${columnNo})`;
    const stackFull = error && error !== null && error !== undefined && error.stack ? error.stack : '';

    addError([...errorList, {
      messageFull,
      stackFull
    }]);
  }

  window.onerror = captureError;

  return (
    <div className="error-log">
      {errorList.map((error, index) => <div key={index}>{error.messageFull}</div>)}
    </div>
  );
}
