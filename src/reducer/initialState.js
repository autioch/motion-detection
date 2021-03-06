import { RECORD_MODE } from '../consts';

export const initialState = {
  videoStream: null,
  lastRender: Date.now(),
  currentRender: Date.now() + 1,
  recorderState: RECORD_MODE.WAITING,
  detectMotion: false,
  motionColor: {
    R: 0,
    G: 255,
    B: 0
  }
};
