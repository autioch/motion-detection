import { screenshot, interval } from 'utils';
import tag from 'lean-tag';
import motionViewFactory from './motion/view';
import fpsViewFactory from './fps';
import recorderFactory from './recorder';
import './styles';

export default function videoView(detector, videoStream) {
  let motionView;
  let record = false;

  function takePrintscreen() {
    const serializedDate = new Date().toJSON();
    const timestamp = serializedDate.replace('T', ' ').replace('Z', '');

    screenshot(detector.compareCanvas, `motion\\screenshot-${timestamp}.png`);
  }

  const screenshotEl = tag('button.app-video__screeenshot', 'Screenshot', {
    onclick: takePrintscreen
  });

  const videoEl = tag('video.app-video__display', {
    onloadedmetadata: (ev) => ev.target.play(),
    srcObject: videoStream
  });

  const fpsView = fpsViewFactory();
  const recorder = recorderFactory(videoStream, detector.getConfig().recordTolerance);

  const el = tag('.app-video', [videoEl, fpsView.el, recorder.el, screenshotEl]);

  function updateMotion() {
    fpsView.update();

    if (!detector.getConfig().motionDetection) {
      recorder.stopRecording();
      motionView.hide();

      return;
    }

    const { changedData, isInMotion } = detector.compareFrame(videoEl);

    if (!isInMotion) {
      recorder.stopRecording();
      motionView.hide();

      return;
    }

    if (record) {
      recorder.startRecording();
    }

    if (changedData.changed) {
      motionView.show(changedData);
    }
  }

  function updateConfig() {
    const { width, color, height, differ, quality, recordMotion } = detector.getConfig();

    record = recordMotion;

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
  interval(updateMotion);

  return {
    el,
    updateConfig
  };
}
