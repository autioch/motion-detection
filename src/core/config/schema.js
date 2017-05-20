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
    label: 'Enable motion detection',
    type: 'boolean',
    value: true
  },
  differ: {
    label: 'Differ type',
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
    value: 1
  },
  compareCanvas: {
    label: 'Show compare canvas',
    type: 'boolean',
    value: false
  }

  // source: {
  //   label: 'Video source',
  //   type: null,
  //   value: null,
  //   hidden: true
  // }
};
