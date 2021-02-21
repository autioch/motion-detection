import { Button } from 'antd';
import { screenshot } from 'utils';

function getFilename() {
  const serializedDate = new Date().toJSON();
  const timestamp = serializedDate.replace('T', ' ').replace('Z', '');

  return `motion\\screenshot-${timestamp}.png`;
}

const MILISECOND = 1000;

const setBackgroundFrame = (detector, videoEl) => detector.setBackgroundFrame(videoEl);
const takeScreenshot = (detector) => screenshot(detector.compareCanvas, getFilename());

function getFpsMeasurer() {
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

const measureFpsFn = getFpsMeasurer();

export default function Video() {
  return (
    <div>
      <Button className="app-video__background-frame" onClick={setBackgroundFrame}>Set background frame</Button>
      <Button className="app-video__screeenshot" onClick={takeScreenshot}>Screenshot</Button>
      <div className="video-fps">{measureFpsFn()}</div>
    </div>
  );
}
