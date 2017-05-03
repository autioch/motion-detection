export default function getFilename() {
  const dateTime = new Date().toLocaleString().replace(/(\.|, |:)/g, '-');

  return `motion-detection${dateTime}.png`;
}
