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

  const el = tag('.app-video', [videoEl, rectMotionEl, screenshotEl]);

  function updateMotion() {
    const changedData = detector.compareFrame(videoEl);

    rectMotionEl.style.cssText = [
      `display:${changedData.changed ? 'block' : 'none'}`,
      `height:${changedData.height}px`,
      `width:${changedData.width}px`,
      `left:${changedData.left}px`,
      `top:${changedData.top}px`
    ].join(';');
  }

  function updateConfig() {
    const { width, height } = detector.getConfig();

    videoEl.width = width;
    videoEl.height = height;
  }

  return {
    el,
    updateConfig,
    updateMotion
  };
}
