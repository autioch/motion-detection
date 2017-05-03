import tag from 'lean-tag';
import config from './config';
import motionDetectorFactory from './motionDetector';
import videoViewFactory from './video/videoView';
import motionViewFactory from './video/motionViewFactory';
import getUserMedia from './video/getUserMedia';

const state = Object.keys(config).reduce((dict, key) => {
  dict[key] = config[key].value;

  return dict;
}, {});

state.height = Math.floor(state.width * 0.75);

const motionDetector = motionDetectorFactory(state);
const videoView = videoViewFactory();
const motionView = motionViewFactory();

const el = tag({
  style: {
    position: 'relative',
    overflow: 'hidden',
    height: `${state.height}px`,
    width: `${state.width}px`
  }
}, [
  videoView.el,
  motionView.el
]);

function detectMotion() {
  requestAnimationFrame(detectMotion);
  const motionState = motionDetector.compareFrame(videoView.el);

  motionView.update(motionState.changedData);
}

document.body.appendChild(el);

getUserMedia().then((videoStream) => {
  videoView.update(state.width, state.height, videoStream);
  detectMotion();
});
