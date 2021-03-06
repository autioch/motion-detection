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
