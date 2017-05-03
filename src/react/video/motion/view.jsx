import { h } from 'preact';
import './styles';

export default function MotionView({ isInMotion, changedData }) {
  const style = {
    display: `${isInMotion ? 'block' : 'none'}`,
    top: `${changedData.top}px`,
    left: `${changedData.left}px`,
    height: `${changedData.height}px`,
    width: `${changedData.width}px`
  };

  return (<div className="rect-view" style={style}/>);
}
