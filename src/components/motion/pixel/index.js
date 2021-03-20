/* eslint-disable max-len */
import { useCanvas } from '../../../utils';
import { useStore } from '../../../store';
import core from '../../../core';
import './index.scss';

export default function PixelMotion() {
  const [state] = useStore();
  const { motionColor, colorNoiseTolerance, comparisonImage, comparisonMode, comparisonQuality, recordMotion, recordMotionPauseTolerance } = state;
  const { width, height } = core.getDimensions();

  const rgbaColor = `rgba(${motionColor.R}, ${motionColor.G}, ${motionColor.B}, 0.5)`;

  function drawFn(context) {
    context.fillStyle = rgbaColor;
    context.clearRect(0, 0, width, height);

    const { pixels, isChanged } = core.getDiff(colorNoiseTolerance, comparisonImage, comparisonMode);

    core.handleRecording(recordMotion, isChanged, recordMotionPauseTolerance);

    for (let index = 0; index < pixels.length; index = index + 2) {
      context.fillRect(pixels[index], pixels[index + 1], comparisonQuality, comparisonQuality); // 10 should be quality
    }
  }

  const canvasRef = useCanvas(drawFn);

  return (
    <canvas className="pixel-motion" ref={canvasRef} width={width} height={height} />
  );
}
