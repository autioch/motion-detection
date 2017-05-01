import { render, h } from 'preact';
import VideoView from './video/view.jsx';
import ControlsView from './controls/view';

export default function View({ source, width, height, motionDetection }) {
  render(<VideoView source={source.value} width={width.value} height={height.value}/>, document.body);
  render(<ControlsView controls={[width, motionDetection]}/>, document.body);
}
