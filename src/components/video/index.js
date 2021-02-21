import { Button } from 'antd';
import { takeScreenshort, setBackgroundFrame } from '../../reducer';
import { useStore } from '../../store';

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';

export default function Video({ recorderState = '', fps = 0 }) {
  const [, dispatch] = useStore();

  return (
    <div>
      <Button className="app-video__background-frame" onClick={() => dispatch(setBackgroundFrame())}>
        Set background frame
      </Button>
      <Button className="app-video__screeenshot" onClick={() => dispatch(takeScreenshort())}>
      Screenshot
      </Button>
      <div className="video-fps">{fps}</div>
      <div className="recorder">{recorderState}</div>
    </div>
  );
}
