import { getData } from './utils/urlHash';
import objToArray from './utils/objToArray';
import getWidthOption from './utils/getWidthOption';
import keepInRange from './utils/keepInRange';
const widthOption = getWidthOption();

const config = {
  width: {
    label: 'Video width',
    type: 'range',
    min: widthOption.min,
    max: widthOption.max,
    value: widthOption.max
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
  }
};

const hashData = getData();

objToArray(config).forEach((item) => {
  const value = hashData[item.key];

  if (value !== undefined) {
    if (item.value.type === 'range') {
      item.value.value = keepInRange(item.value.min, item.value.max, value);
    } else {
      item.value.value = value;
    }
  }
});

export default config;
