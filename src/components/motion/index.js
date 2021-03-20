import { COMPARISON_MODE } from '../../consts';
import { useStore } from '../../store';
import PixelMotion from './pixel';
import SingleRectMotion from './singleRect';

const Views = {
  [COMPARISON_MODE.SINGLE_RECT]: SingleRectMotion,
  [COMPARISON_MODE.PIXEL]: PixelMotion
};

export default function Motion() {
  const [state] = useStore();
  const { detectMotion, comparisonMode } = state;

  if (!detectMotion) {
    return '';
  }

  const View = Views[comparisonMode];

  return <View />;
}
