/* eslint-disable max-len */
import { useState } from 'react';
import { useStore } from '../../../store';
import core from '../../../core';
import { useRaf } from '../../../utils';
import './index.scss';

export default function RectMotion() {
  const [state] = useStore();
  const { motionColor, colorNoiseTolerance, comparisonImage, comparisonMode, recordMotion, recordMotionPauseTolerance } = state;
  const [diff, setDiff] = useState({});

  useRaf(() => setDiff(core.getDiff(colorNoiseTolerance, comparisonImage, comparisonMode)));

  core.handleRecording(recordMotion, diff.isChanged, recordMotionPauseTolerance);

  return (
    <div
      className="single-rect-motion"
      style={{
        background: `rgba(${motionColor.R}, ${motionColor.G}, ${motionColor.B}, 0.5)`,
        width: `${diff.width}px`,
        height: `${diff.height}px`,
        left: `${diff.left}px`,
        top: `${diff.top}px`
      }}
    />
  );
}
