import schema from '../core/schema';

export const initialState = {
  schema,
  isInMotion: false,
  lastStatic: performance.now(),
  lastMotion: performance.now(),
  changedData: {},
  backgroundFrame: null,
  videoStream: null
};
