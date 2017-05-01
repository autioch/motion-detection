const TIME_LENGTH = 8;

export default function logFactory(el){


}

export default function logMessage(...messages) {
  const div = document.createElement('div');

  div.textContent = `${new Date().toTimeString().substr(0, TIME_LENGTH)} ${messages.join(', ')}`;
  document.body.appendChild(div);
}
