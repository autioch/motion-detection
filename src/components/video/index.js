import { Button } from 'antd';
import { takeScreenshort, setBackgroundFrame } from '../../reducer';
import { useStore } from '../../store';
import { useEffect, useRef } from 'react';

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';

const startPlaying = (ev) => ev.target.play();

export default function Video({ videoStream, width, height, recorderState = '', fps = 0 }) {
  const [, dispatch] = useStore();
  const refVideo = useRef(null);

  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.srcObject = videoStream;
    }
  }, [videoStream]);

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
      <video
        ref={refVideo}
        className="app-video__display"
        onLoadedMetadata={startPlaying}
        srcObject={videoStream}
        width={width}
        height={height}
      />
    </div>
  );
}
