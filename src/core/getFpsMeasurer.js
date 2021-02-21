const MILISECOND = 1000;

export default function getFpsMeasurer() {
  let lastRender = Date.now();

  let fps = 0;

  return function measureFps() {
    const currentRender = Date.now();
    const delta = (currentRender - lastRender) / MILISECOND;

    lastRender = currentRender;
    fps = Math.floor(1 / delta);

    return fps;
  };
}
