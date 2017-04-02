import { setData } from '../utils/urlHash';

export default function fireCallbacks(callbacks, serialized) {
  callbacks.forEach((callback) => callback(serialized));
  setData(serialized);
}
