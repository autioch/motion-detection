import RectMotion from './rect';
import PixelMotion from './pixel';
import { hexToRgb } from 'utils';
import './index';

const motionTypes = {
  '1': RectMotion,
  '2': PixelMotion
};

export default function Motion({ type, color, width, height, quality }) {
  return motionTypes[type](hexToRgb(color), width, height, quality);
}
