import getImageDifference from './getImageDifference';

export default function detectMotion(props, state, currentFrame) {
  const { compareWidth, previousFrame } = state;
  const { colorTolerance, timeTolerance, quality } = props;
  const changedData = getImageDifference(compareWidth, quality, colorTolerance, previousFrame, currentFrame);
  let { isInMotion, lastStatic, lastMotion } = state;

  const currentTime = performance.now();

  if (changedData.changed) {
    if (currentTime - lastStatic > timeTolerance) {
      isInMotion = true;
      lastMotion = currentTime;
    }
  } else if (currentTime - lastMotion > timeTolerance) {
    isInMotion = false;
    lastStatic = isInMotion ? currentTime : lastStatic;
  }

  return {
    isInMotion,
    lastStatic,
    lastMotion,
    previousFrame: currentFrame,
    changedData
  };
}
