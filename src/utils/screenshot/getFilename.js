export default function getFilename() {
  const serializedDate = new Date().toJSON();
  const dateTime = serializedDate.replace('T', ' ').replace('Z', '');

  return `motion-detection${dateTime}.png`;
}
