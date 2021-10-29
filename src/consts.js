export const RECORD_MODE = {
  WAITING: 1,
  RECORDING: 2,
  STOPPED: 3
};

export const RECORD_MODE_LABEL = {
  [RECORD_MODE.WAITING]: 'Recorder waiting...',
  [RECORD_MODE.RECORDING]: 'Recording...',
  [RECORD_MODE.STOPPED]: 'Recorder stopped.'
};

export const MAX_COMPARISON_QUALITY = 20;

export const COMPARISON_IMAGE = {
  PREVIOUS: 1,
  CUSTOM: 2,
  LAST_STATIC: 3
};

export const COMPARISON_IMAGE_LABEL = {
  [COMPARISON_IMAGE.PREVIOUS]: 'Live (previous frame)',
  [COMPARISON_IMAGE.CUSTOM]: 'Selected frame',
  [COMPARISON_IMAGE.LAST_STATIC]: 'Last static frame'
};

export const COMPARISON_MODE = {
  SINGLE_RECT: 1,
  PIXEL: 2
};

export const COMPARISON_MODE_LABEL = {
  [COMPARISON_MODE.SINGLE_RECT]: 'Single rect',
  [COMPARISON_MODE.PIXEL]: 'Pixels'
};
