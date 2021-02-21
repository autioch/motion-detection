/* eslint id-length: 0 */
/* eslint no-magic-numbers: 0 */
export default function hexToRgb(hex) {
  return {
    R: parseInt(hex[1] + hex[2], 16),
    G: parseInt(hex[3] + hex[4], 16),
    B: parseInt(hex[5] + hex[6], 16)
  };
}
