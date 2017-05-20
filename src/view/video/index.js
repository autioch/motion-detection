import { screenshot } from 'utils';
import tag from 'lean-tag';

import './styles';

export default function videoView(detector, videoStream) {
  const rectMotionEl = tag('.rect-view');

  const screenshotEl = tag('button.app-video__screeenshot', 'Screenshot', {
    onclick: () => screenshot(detector.compareCanvas)
  });

  const videoEl = tag('video.app-video__display', {
    onloadedmetadata: (ev) => ev.target.play(),
    srcObject: videoStream,
    width: detector.getConfig().width,
    height: detector.getConfig().height
  });

  const el = tag('.app-video', [videoEl, rectMotionEl, screenshotEl], {
    style: {
      width: `${detector.getConfig().width}px`
    }
  });

  function updateMotion() {
    const { motionDetection } = detector.getConfig();

    if (!motionDetection) {
      rectMotionEl.style.display = 'none';

      return;
    }

    const { changedData, isInMotion } = detector.compareFrame(videoEl);

    if (isInMotion) {
      if (changedData.changed) {
        rectMotionEl.style.cssText = [
          `display:block`,
          `height:${changedData.height}px`,
          `width:${changedData.width}px`,
          `left:${changedData.left}px`,
          `top:${changedData.top}px`
        ].join(';');
      }
    } else {
      rectMotionEl.style.display = 'none';
    }
  }

  function updateConfig() {
    const { width, height } = detector.getConfig();

    el.style.width = `${width}px`;

    videoEl.width = width;
    videoEl.height = height;
  }

  return {
    el,
    updateConfig,
    updateMotion
  };
}
