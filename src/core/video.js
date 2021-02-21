/* eslint no-use-before-define: 0 */
import tag from 'lean-tag';
import motionViewFactory from './motion/view';
import fpsViewFactory from './fps';
import recorderFactory from './recorder';
import screenshotViewFactory from './screenshot';
import backgroundFrameViewFactory from './backgroundFrame';
import './styles';

function interval(callback) {
  let rafId = requestAnimationFrame(callback);

  function cancel() {
    cancelAnimationFrame(rafId);
  }

  function loop() {
    rafId = requestAnimationFrame(loop);
    callback();
  }

  loop();

  return {
    cancel
  };
}

export default function videoView(detector, videoStream) {
  let motionView;

  let record = false;

  const videoEl = tag('video.app-video__display', {
    onloadedmetadata: startPlaying,
    srcObject: videoStream
  });

  const fpsView = fpsViewFactory();
  const screenshotView = screenshotViewFactory(detector);
  const recorder = recorderFactory(videoStream, detector.getConfig().recordTolerance);
  const backgroundFrameView = backgroundFrameViewFactory(detector, videoEl);

  const el = tag('.app-video', [videoEl, fpsView.el, recorder.el, screenshotView.el]);

  function startPlaying() {
    videoEl.play();
    interval(updateMotion);
  }

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
    const { width, color, height, differ, quality, recordMotion, background } = detector.getConfig();

    record = recordMotion;

    el.style.width = `${width}px`;

    videoEl.width = width;
    videoEl.height = height;

    if (!record) {
      recorder.stopRecording(true);
    }

    if (motionView) {
      el.removeChild(motionView.el);
    }

    if (record) {
      el.appendChild(recorder.el);
    } else {
      recorder.el.parentNode && el.removeChild(recorder.el);
    }

    if (background == 2) {
      el.appendChild(backgroundFrameView.el);
    } else {
      backgroundFrameView.el.parentNode && el.removeChild(backgroundFrameView.el);
    }

    motionView = motionViewFactory(differ, color, width, height, quality);
    el.appendChild(motionView.el);
  }

  updateConfig();

  return {
    el,
    updateConfig
  };
}
