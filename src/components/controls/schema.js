/* eslint no-magic-numbers: 0 */
const schema = {
  // width: {
  //   label: 'Video width',
  //   type: 'range',
  //   min: 128,
  //   max: 640,
  //   value: 640
  // },
  // height: {
  //   label: 'Video height',
  //   type: 'range',
  //   min: 96,
  //   max: 480,
  //   value: 480,
  //   hidden: true
  // },
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
  background: {
    label: 'Compare style',
    type: 'list',
    value: 2,
    options: [{
      value: 1,
      label: 'Previous frame'
    }, {
      value: 2,
      label: 'Background frame'
    }, {
      value: 3,
      label: 'Last static frame'
    }]
  },

  // timeTolerance: {
  //   label: 'Motion pause tolerance',
  //   type: 'range',
  //   min: 1,
  //   max: 1000,
  //   value: 300
  // },
  // compareCanvas: {
  //   label: 'Show compare canvas',
  //   type: 'boolean',
  //   value: false,
  //   hidden: true
  // },
  recordMotion: {
    label: 'Record motion',
    type: 'boolean',
    value: false
  },
  recordTolerance: {
    label: 'Record pause tolerance',
    type: 'range',
    min: 1,
    max: 20,
    value: 5
  }
};

export default schema;
