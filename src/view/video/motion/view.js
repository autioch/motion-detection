import rectMotionViewFactory from './rect';
import pixelMotionViewFactory from './pixel';
import { hexToRgb } from 'utils';
import './styles';

const motionTypes = {
  '1': rectMotionViewFactory,
  '2': pixelMotionViewFactory
};

export default function videoMotionFactory(type, color, width, height, quality) {
  return motionTypes[type](hexToRgb(color), width, height, quality);
}
