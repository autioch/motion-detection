import imageDifferFactory from './imageDiffer';
import getInitialState from './getInitialState';
import getInitialConfig from './getInitialConfig';

const RATIO = 0.75;

export default function detectorFactory(initialConfig = {}) {
  const compareCanvas = document.createElement('canvas');
  const compareContext = compareCanvas.getContext('2d');
  const state = getInitialState();
  const config = getInitialConfig();
  let backgroundFrame;
  let imageDiffer;
  let compareWidth;
  let compareHeight;
  let staticFrames = 0;

  function updateConfig(newConfig) {
    Object.assign(config, newConfig);
    config.height = Math.round(config.width * RATIO);
    compareWidth = Math.floor(config.width / config.quality);
    compareHeight = Math.floor(config.height / config.quality);
    compareCanvas.width = compareWidth;
    compareCanvas.height = compareHeight;
    backgroundFrame = null;
    state.changedData = {};
    staticFrames = 0;
    imageDiffer = imageDifferFactory(config, compareWidth, compareHeight, config.differ);
  }

  function getFrame(video) {
    compareContext.clearRect(0, 0, compareWidth, compareHeight);
    compareContext.drawImage(video, 0, 0, compareWidth, compareHeight);

    return compareContext.getImageData(0, 0, compareWidth, compareHeight).data;
  }

  function setBackgroundFrame(video) {
    backgroundFrame = getFrame(video);
  }

  function compareFrame(video) {
    const newFrame = getFrame(video);

    if (!backgroundFrame) {
      backgroundFrame = newFrame;

      return state;
    }
    const changedData = imageDiffer.diffImage(backgroundFrame, newFrame);
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

    if (config.background == 1) {
      backgroundFrame = newFrame;
    }

    if (config.background == 3) {
      if (imageDiffer.diffsEqual(state.changedData, changedData)) {
        if (staticFrames > 5) {
          staticFrames = 0;
          backgroundFrame = newFrame;
        }
      } else {
        staticFrames = 0;
      }
    }

    state.changedData = changedData;

    return state;
  }

  updateConfig(initialConfig);

  return {
    updateConfig,
    compareFrame,
    compareCanvas,
    setBackgroundFrame,
    getState: () => state,
    getConfig: () => config
  };
}
