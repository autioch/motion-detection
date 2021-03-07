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

export const COMPARISON_MODE = {
  PREVIOUS: 1,
  CUSTOM: 2,
  LAST_STATIC: 3
};

export const COMPARISON_MODE_LABEL = {
  [COMPARISON_MODE.PREVIOUS]: 'Live (previous frame)',
  [COMPARISON_MODE.CUSTOM]: 'Selected frame',
  [COMPARISON_MODE.LAST_STATIC]: 'Last static frame'
};
