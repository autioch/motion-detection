import { h } from 'preact';

export default function VideoView({ source, width, height }) {
  return (<video
    srcObject={source}
    width={width}
    height={height}
    onloadedmetadata={(ev) => ev.target.play()}
   />);
}
