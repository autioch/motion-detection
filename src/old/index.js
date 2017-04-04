import imageCacheFactory from './app/imageCache';
import imageDiffFactory from './app/imageDiff';
import pixelViewFactory from './changeViews/pixel/view';
import rectViewFactory from './changeViews/rect/view';
import pixelModelFactory from './changeViews/pixel/model';
import rectModelFactory from './changeViews/rect/model';
import configViewFactory from './configView';
import configStoreFactory from './configStore';
import logViewFactory from './logView';
import config from './config';

import getUserMedia from './utils/getUserMedia';
import './index.scss';

const videoEl = document.querySelector('.js-video');
const configStore = configStoreFactory(config);
const logView = logViewFactory();

document.body.appendChild(logView.el);

configViewFactory(configStore);
const imageCache = configStore.bind(imageCacheFactory());
const imageDiff = configStore.bind(imageDiffFactory());
const rectView = configStore.bind(rectViewFactory(videoEl));
const pixelView = configStore.bind(pixelViewFactory(videoEl));
const rectModel = configStore.bind(rectModelFactory());
const pixelModel = configStore.bind(pixelModelFactory());

const changeDict = {
  '1': {
    view: rectView,
    model: rectModel
  },
  '2': {
    view: pixelView,
    model: pixelModel
  }
};

let rafCheckRequest = false;
let changeView;
let changeModel;

/* TODO check if window has focus? */
function checkMotion() {
  imageCache.add(videoEl);
  const data = imageCache.get();

  /* TODO checks are very, very pricey... */

  changeModel.reset();
  imageDiff.check(changeModel, data);
  changeView.update(changeModel.get());
  rafCheckRequest = requestAnimationFrame(checkMotion);
}

function start() {
  if (rafCheckRequest) {
    cancelAnimationFrame(rafCheckRequest);
  }
  checkMotion();
}

function stop() {
  changeView.hide();
  if (rafCheckRequest) {
    cancelAnimationFrame(rafCheckRequest);
  }
}

function changeWidth(serializedConfig) {
  videoEl.width = serializedConfig.width;
  videoEl.height = serializedConfig.width / 4 * 3;
}

function toggleDetection(serializedConfig) {
  if (serializedConfig.motionDetection) {
    start();
  } else {
    stop();
  }
}

function changeMarker(serializedConfig) {
  if (changeView) {
    videoEl.parentNode.removeChild(changeView.el);
  }
  const changeItem = changeDict[serializedConfig.marker];

  changeView = changeItem.view;
  changeModel = changeItem.model;
  videoEl.parentNode.appendChild(changeView.el);
}

configStore
  .onWidth(changeWidth)
  .onMotionDetection(toggleDetection)
  .onMarker(changeMarker);

window.addEventListener('DOMContentLoaded', () => {
  window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    logView.log(`Error occured: ${errorMsg}\n${url}\n${lineNumber}`);

    return false;
  };

  getUserMedia().then(function startApp(stream) {
    const serializedConfig = configStore.serialize();

    changeWidth(serializedConfig);
    videoEl.src = stream;
    videoEl.play();
    changeMarker(serializedConfig);
    toggleDetection(serializedConfig);
  });
});
