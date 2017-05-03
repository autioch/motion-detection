import { screenshot } from 'core';
import tag from 'lean-tag';
import './styles';

export default function screenshotViewFactory(detector) {
  const el = tag('button', 'Screenshot', {
    onclick: () => screenshot(detector.getCanvas())
  });

  return {
    el
  };
}
