import { screenshot } from 'utils';
import tag from 'lean-tag';
import './styles';

function getFilename() {
  const serializedDate = new Date().toJSON();
  const timestamp = serializedDate.replace('T', ' ').replace('Z', '');

  return `motion\\screenshot-${timestamp}.png`;
}

export default function screenshotView(detector) {
  const el = tag('button.app-video__screeenshot', 'Screenshot', {
    onclick: () => screenshot(detector.compareCanvas, getFilename())
  });

  return {
    el
  };
}
