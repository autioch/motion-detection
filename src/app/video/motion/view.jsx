import { h } from 'preact';
import './styles';

export default function MotionView({ changedData }) {
  const style = {
    transform: `translate(${changedData.left}px,${changedData.top}px)`,
    height: `${changedData.height}px`,
    width: `${changedData.width}px`
  };

  return (<div style={style}/>);
}
