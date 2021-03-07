import { useState } from 'react';
import { useStore } from '../../store';
import thing from '../../thing';
import useRaf from './useRaf';
import './index.scss';

export default function RectMotion() {
  const [state] = useStore();
  const { motionColor, colorNoiseTolerance, comparisonQuality } = state;

  const [diff, setDiff] = useState({});

  useRaf(() => setDiff(thing.getDiff(colorNoiseTolerance, comparisonQuality)));

  return (
    <div
      className="rect-motion"
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
