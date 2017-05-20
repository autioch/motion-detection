/* eslint no-magic-numbers: 0 */
export default {
  width: {
    label: 'Video width',
    type: 'range',
    min: 128,
    max: 640,
    value: 640
  },
  height: {
    label: 'Video height',
    type: 'range',
    min: 96,
    max: 480,
    value: 480,
    hidden: true
  },
  motionDetection: {
    label: 'Detect motion',
    type: 'boolean',
    value: true
  },
  differ: {
    label: 'Motion precision',
    type: 'list',
    value: 2,
    options: [{
      value: 1,
      label: 'Rectangle'
    }, {
      value: 2,
      label: 'Pixel'
    }]
  },
  color: {
    label: 'Motion color',
    type: 'color',
    value: '#00ff00'
  },
  quality: {
    label: 'Comparison inaccuracy',
    type: 'range',
    min: 1,
    max: 10,
    value: 5
  },
  colorTolerance: {
    label: 'Color noise tolerance',
    type: 'range',
    min: 0,
    max: 255,
    value: 40
  },
  timeTolerance: {
    label: 'Motion pause tolerance',
    type: 'range',
    min: 1,
    max: 1000,
    value: 300
  },
  compareCanvas: {
    label: 'Show compare canvas',
    type: 'boolean',
    value: false,
    hidden: true
  }
};
