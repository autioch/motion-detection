import { Button } from 'antd';
import downloadScreenshot from '../../detector/downloadScreenshot';
import setBackgroundFrame from '../../detector/setBackgroundFrame';

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';

export default function Video({ recorderState = '', fps = 0 }) {
  return (
    <div>
      <Button className="app-video__background-frame" onClick={setBackgroundFrame}>Set background frame</Button>
      <Button className="app-video__screeenshot" onClick={downloadScreenshot}>Screenshot</Button>
      <div className="video-fps">{fps}</div>
      <div className="recorder">{recorderState}</div>
    </div>
  );
}
