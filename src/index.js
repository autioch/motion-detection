import ImageCacheFactory from './app/imageCache';
import ImageDiffFactory from './app/imageDiff';
import PixelViewFactory from './changeViews/pixel/view';
import RectViewFactory from './changeViews/rect/view';
import PixelModelFactory from './changeViews/pixel/model';
import RectModelFactory from './changeViews/rect/model';
import ConfigViewFactory from './configView';

import ConfigStoreFactory from './configStore';
import config from './config';

import getUserMedia from './utils/getUserMedia';
import './index.scss';

window.markup = '';
window.template = () => {};

function getTime() {
  const time = new Date();

  return [time.getHours(), time.getMinutes(), time.getSeconds()]
    .map((val) => val.toString())
    .map((str) => str.length < 2 ? `0${str}` : str)
    .join(':');
}

function logMessage(message) {
  const div = document.createElement('div');

  div.textContent = `${getTime()} ${message}`;
  document.body.appendChild(div);
}

logMessage('LOG');

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  logMessage(`Error occured: ${errorMsg}\n${url}\n${lineNumber}`);

  return false;
};

const videoEl = document.querySelector('.js-video');
const configStore = ConfigStoreFactory(config);

ConfigViewFactory(configStore);
const imageCache = configStore.bind(ImageCacheFactory());
const imageDiff = configStore.bind(ImageDiffFactory());
const rectView = configStore.bind(RectViewFactory(videoEl));
const pixelView = configStore.bind(PixelViewFactory(videoEl));
const rectModel = configStore.bind(RectModelFactory());
const pixelModel = configStore.bind(PixelModelFactory());

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
  getUserMedia().then(function startApp(stream) {
    const serializedConfig = configStore.serialize();

    changeWidth(serializedConfig);
    videoEl.src = stream;
    videoEl.play();
    changeMarker(serializedConfig);
    toggleDetection(serializedConfig);
  });
});
