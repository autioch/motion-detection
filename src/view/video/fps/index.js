import tag from 'lean-tag';
import './styles';

const MILISECOND = 1000;

export default function rectMotionView() {
  let lastRender = Date.now();
  let fps = 0;

  const el = tag('.video-fps');

  function update() {
    const currentRender = Date.now();
    const delta = (currentRender - lastRender) / MILISECOND;

    lastRender = currentRender;
    fps = Math.floor(1 / delta);
    el.textContent = `${fps} fps`;
  }

  return {
    el,
    update
  };
}
