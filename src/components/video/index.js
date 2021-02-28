/* eslint-disable max-len */
import { Button } from 'antd';
import { takeScreenshort, setBackgroundFrame } from '../../reducer';
import { useStore } from '../../store';
import { useEffect, useRef } from 'react';
import './index.scss';
import getDimensions from '../../core/getDimensions';

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';

const startPlaying = (ev) => ev.target.play();

export default function Video({ videoStream, recorderState = '', fps = 0 }) {
  const [, dispatch] = useStore();
  const refVideo = useRef(null);
  const { width, height } = getDimensions();

  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div className="c-video">
      <div className="c-video__overlay">
        <Button className="c-video__background-frame" onClick={() => dispatch(setBackgroundFrame())}>Set background frame</Button>
        <Button className="c-video__screeenshot" onClick={() => dispatch(takeScreenshort())}>Screenshot</Button>
        <div className="c-video__fps">{fps}</div>
        <div className="c-video__recorder">{recorderState}</div>
      </div>
      <video
        ref={refVideo}
        className="c-video__element"
        onLoadedMetadata={startPlaying}
        srcObject={videoStream}
        width={width}
        height={height}
      />
    </div>
  );
}
