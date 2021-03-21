/* eslint-disable max-len */
import { useRaf } from '../utils';
import { useRef } from 'react';
import { useStore } from '../store';
import core from '../core';

export default function Motion() {
  const [state] = useStore();
  const elRef = useRef(null);
  const { width, height } = core.getDimensions();
  const { motionColor, comparisonMode, recordMotion, recordMotionPauseTolerance, colorNoiseTolerance, comparisonImage } = state;

  useRaf(() => core.updateDiffCanvas(elRef.current, motionColor, comparisonMode, recordMotion, recordMotionPauseTolerance, colorNoiseTolerance, comparisonImage));

  return (
    <canvas ref={elRef} className="c-motion" width={width} height={height} />
  );
}
