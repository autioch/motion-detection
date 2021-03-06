import { useEffect, useRef } from 'react';
import './index.scss';
import thing from '../../thing';

const startPlaying = (ev) => ev.target.play();

export default function Video({ videoStream }) {
  const refVideo = useRef(null);
  const { width, height } = thing.getDimensions();

  useEffect(() => {
    thing.setVideoElement(refVideo.current);
    if (refVideo.current) {
      refVideo.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <video
      ref={refVideo}
      className="c-video"
      onLoadedMetadata={startPlaying}
      srcObject={videoStream}
      width={width}
      height={height}
    />
  );
}
