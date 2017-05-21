import tag from 'lean-tag';
import './styles';

export default function firstFrameView(detector, videoEl) {
  const el = tag('button.app-video__background-frame.app-video__overlay', 'Set background frame', {
    onclick: () => detector.setBackgroundFrame(videoEl)
  });

  return {
    el
  };
}
