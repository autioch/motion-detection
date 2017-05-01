/* eslint no-magic-numbers: 0 */
import getWidthOption from './utils/getWidthOption';
const { min, max } = getWidthOption();

const config = {
  width: {
    label: 'Video width',
    type: 'range',
    min,
    max,
    value: 640
  },
  height: {
    label: 'Video height',
    type: 'range',
    min,
    max,
    value: 480,
    visible: false
  },
  motionDetection: {
    label: 'Enable motion detection',
    type: 'boolean',
    value: true
  },
  marker: {
    label: 'Marker type',
    type: 'list',
    value: 1,
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
    value: 50
  },
  timeTolerance: {
    label: 'Short term noise tolerance',
    type: 'range',
    min: 1,
    max: 1000,
    value: 500
  },
  quality: {
    label: 'Difference simplicity',
    type: 'range',
    min: 1,
    max: 10,
    value: 5
  },
  compareCanvas: {
    label: 'Show compare canvas',
    type: 'boolean',
    value: false
  },
  source: {
    label: 'Video source',
    type: null,
    value: null,
    visible: false
  }
};

export default config;
