/* eslint-disable max-len */
import { Button } from 'antd';
import './index.scss';
import thing from '../../thing';
import { useStore } from '../../store';
import { RECORD_MODE_LABEL } from '../../consts';

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';

const MILISECOND = 1000;

function getFps(lastRender, currentRender) {
  const delta = (currentRender - lastRender) / MILISECOND;

  return Math.floor(1 / delta);
}

export default function Video() {
  const [state] = useStore();
  const { lastRender, currentRender, recorderState } = state;

  return (
    <div className="c-overlay">
      <div className="c-overlay__tr">
        <Button onClick={thing.takeScreenshort}>Screenshot</Button>
      </div>
      <div className="c-overlay__br">
        <span className="c-overlay__text">{getFps(lastRender, currentRender)} FPS</span>
        <span className="c-overlay__text">{RECORD_MODE_LABEL[recorderState]}</span>
      </div>
    </div>
  );
}
