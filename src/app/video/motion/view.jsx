import { h } from 'preact';
import './styles';

export default function MotionView({ isInMotion, changedData }) {
  const style = {
    display: `${isInMotion ? 'block' : 'none'}`,
    transform: `translate(${changedData.left}px,${changedData.top}px)`,
    height: `${changedData.height}px`,
    width: `${changedData.width}px`
  };

  return (<div className="rect-view" style={style}/>);
}
