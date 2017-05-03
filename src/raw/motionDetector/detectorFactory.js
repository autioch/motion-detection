import getImageDiffer from './getImageDiffer';
import getInitialState from './getInitialState';
import getInitialConfig from './getInitialConfig';

export default function detectorFactory(initialConfig = {}) {
  const compareCanvas = document.createElement('canvas');
  const compareContext = compareCanvas.getContext('2d');
  const state = getInitialState();
  const config = getInitialConfig();
  let previousFrame;
  let diffImage;
  let compareWidth;
  let compareHeight;

  function updateConfig(newConfig) {
    Object.assign(config, newConfig);
    compareWidth = Math.floor(config.width / config.quality);
    compareHeight = Math.floor(config.height / config.quality);
    compareCanvas.width = compareWidth;
    compareCanvas.height = compareHeight;
    diffImage = getImageDiffer(config, compareWidth, compareHeight);
  }

  function getFrame(video) {
    compareContext.clearRect(0, 0, compareWidth, compareHeight);
    compareContext.drawImage(video, 0, 0, compareWidth, compareHeight);

    return compareContext.getImageData(0, 0, compareWidth, compareHeight).data;
  }

  function compareFrame(video) {
    const newFrame = getFrame(video);
    const changedData = diffImage(previousFrame, newFrame);

    const currentTime = performance.now();

    if (changedData.changed) {
      if (currentTime - state.lastStatic > config.timeTolerance) {
        state.isInMotion = true;
        state.lastMotion = currentTime;
      }
    } else if (currentTime - state.lastMotion > config.timeTolerance) {
      if (state.isInMotion) {
        state.lastStatic = currentTime;
      }
      state.isInMotion = false;
    }

    previousFrame = newFrame;
    state.changedData = changedData;

    return state;
  }

  updateConfig(initialConfig);

  previousFrame = compareContext.getImageData(0, 0, compareWidth, compareHeight).data;

  return {
    updateConfig,
    compareFrame,
    getState: () => state
  };
}
