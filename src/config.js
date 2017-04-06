/* eslint no-magic-numbers: 0 */
import getWidthOption from './utils/getWidthOption';
const widthOption = getWidthOption();

const config = {
  width: {
    label: 'Video width',
    type: 'range',
    min: widthOption.min,
    max: widthOption.max,
    defaultValue: widthOption.value
  },
  motionDetection: {
    label: 'Enable motion detection',
    type: 'boolean',
    defaultValue: true
  },
  marker: {
    label: 'Marker type',
    type: 'list',
    defaultValue: 1,
    options: [{
      value: 1,
      label: 'Rectangle'
    }, {
      value: 2,
      label: 'Pixel'
    }]
  },
  colorTolerance: {
    label: 'Color difference tolerance',
    type: 'range',
    min: 0,
    max: 255,
    defaultValue: 50
  },
  timeTolerance: {
    label: 'Short term noise tolerance',
    type: 'range',
    min: 1,
    max: 1000,
    defaultValue: 500
  },
  quality: {
    label: 'Difference simplicity',
    type: 'range',
    min: 1,
    max: 10,
    defaultValue: 5
  },
  compareCanvas: {
    label: 'Show compare canvas',
    type: 'boolean',
    defaultValue: false
  }
};

export default config;
