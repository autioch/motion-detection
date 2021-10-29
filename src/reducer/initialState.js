import { RECORD_MODE, COMPARISON_IMAGE, COMPARISON_MODE } from '../consts';
import { getDimensions } from '../utils';

const { width, height } = getDimensions();

export const initialState = {
  lastRender: Date.now(),
  currentRender: Date.now() + 1,
  recorderState: RECORD_MODE.WAITING,
  detectMotion: false,
  colorNoiseTolerance: 40,
  comparisonQuality: 10,
  comparisonImage: COMPARISON_IMAGE.PREVIOUS,
  comparisonMode: COMPARISON_MODE.PIXEL,
  recordMotion: false,
  recordMotionPauseTolerance: 5,
  motionColor: {
    R: 0,
    G: 255,
    B: 0
  },
  videoElement: null,
  videoStream: null,
  videoCanvas: null,
  videoContext: null,
  videoWidth: width,
  videoHeight: height
};
