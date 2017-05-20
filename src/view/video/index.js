import { screenshot } from 'utils';
import tag from 'lean-tag';
import motionViewFactory from './motion/view';
import fpsViewFactory from './fps';
import './styles';

export default function videoView(detector, videoStream) {
  let motionView;

  const screenshotEl = tag('button.app-video__screeenshot', 'Screenshot', {
    onclick: () => screenshot(detector.compareCanvas)
  });

  const videoEl = tag('video.app-video__display', {
    onloadedmetadata: (ev) => ev.target.play(),
    srcObject: videoStream
  });

  const fpsView = fpsViewFactory();

  const el = tag('.app-video', [videoEl, fpsView.el, screenshotEl]);

  function updateMotion() { // eslint-disable-line consistent-return
    fpsView.update();

    if (!detector.getConfig().motionDetection) {
      return motionView.hide();
    }

    const { changedData, isInMotion } = detector.compareFrame(videoEl);

    if (!isInMotion) {
      return motionView.hide();
    }

    if (changedData.changed) {
      motionView.show(changedData);
    }
  }

  function updateConfig() {
    const { width, color, height, differ, quality } = detector.getConfig();

    el.style.width = `${width}px`;

    videoEl.width = width;
    videoEl.height = height;

    if (motionView) {
      el.removeChild(motionView.el);
    }

    motionView = motionViewFactory(differ, color, width, height, quality);
    el.appendChild(motionView.el);
  }

  updateConfig();

  return {
    el,
    updateConfig,
    updateMotion
  };
}
