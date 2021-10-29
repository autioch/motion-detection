export function internalToHex({ R, G, B }) {
  return `#${[R, G, B].map((hex) => hex.toString(16).padStart(2, '0')).join('')}`;
}

export function hexToInternal(h) {
  return {
    R: Number(`0x${h[1]}${h[2]}`),
    G: Number(`0x${h[3]}${h[4]}`),
    B: Number(`0x${h[5]}${h[6]}`)
  };
}
