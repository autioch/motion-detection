/* eslint-disable no-param-reassign, max-statements, max-len, max-params */
export default function detectorFactory(backgroundFrame, newFrame, imageDiffer, oldChangedData, lastStatic, timeTolerance, isInMotion, lastMotion, background, staticFrames) {
  const changedData = imageDiffer.diffImage(backgroundFrame, newFrame);
  const currentTime = performance.now();

  if (changedData.changed) {
    if (currentTime - lastStatic > timeTolerance) {
      isInMotion = true;
      lastMotion = currentTime;
    }
  } else if (currentTime - lastMotion > timeTolerance) {
    if (isInMotion) {
      lastStatic = currentTime;
    }
    isInMotion = false;
  }

  if (background === 1) {
    backgroundFrame = newFrame;
  }

  if (background === 3) {
    if (imageDiffer.diffsEqual(oldChangedData, changedData)) {
      if (staticFrames > 5) {
        staticFrames = 0;
        backgroundFrame = newFrame;
      }
    } else {
      staticFrames = 0;
    }
  }

  return {
    backgroundFrame,
    changedData,
    isInMotion,
    lastMotion,
    lastStatic,
    staticFrames
  };
}
