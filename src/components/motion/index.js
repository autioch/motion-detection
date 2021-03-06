import RectMotion from './rect';
import PixelMotion from './pixel';
import './index';

const motionTypes = {
  '1': RectMotion,
  '2': PixelMotion
};

function hexToRgb(hex) {
  return {
    R: parseInt(hex[1] + hex[2], 16),
    G: parseInt(hex[3] + hex[4], 16),
    B: parseInt(hex[5] + hex[6], 16)
  };
}

export default function Motion({ type, color, width, height, quality }) {
  return motionTypes[type](hexToRgb(color), width, height, quality);
}
