import { getUserMedia, interval, detectorFactory, config } from 'core';
import tag from 'lean-tag';
import videoViewFactory from './video/videoView';
import screenshotViewFactory from './video/screenshotView';
import motionViewFactory from './video/motionViewFactory';

getUserMedia()
  .then((videoStream) => {
    const { state } = config;
    const detector = detectorFactory(state);
    const videoView = videoViewFactory();
    const motionView = motionViewFactory();
    const screenshotView = screenshotViewFactory(detector);

    document.body.appendChild(tag('.app__video', videoView.el, motionView.el, screenshotView.el));
    videoView.update(state.width, state.height, videoStream);
    interval(() => motionView.update(detector.compareFrame(videoView.el)));
  });
