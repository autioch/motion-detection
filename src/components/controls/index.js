/* eslint-disable max-len */
import { Switch, Slider, Select, Button, Divider } from 'antd';
import { useStore } from '../../store';
import { changeSetting } from '../../reducer';
import core from '../../core';
import { MAX_COMPARISON_QUALITY, COMPARISON_IMAGE, COMPARISON_IMAGE_LABEL, COMPARISON_MODE, COMPARISON_MODE_LABEL } from '../../consts';

const { Option } = Select; // eslint-disable-line no-shadow

function rgbToHex({ R, G, B }) {
  return `#${[R, G, B].map((hex) => hex.toString(16).padStart(2, '0')).join('')}`;
}

function hexToRgb(h) {
  return {
    R: Number(`0x${h[1]}${h[2]}`),
    G: Number(`0x${h[3]}${h[4]}`),
    B: Number(`0x${h[5]}${h[6]}`)
  };
}

const comparisonImageOptions = Object.values(COMPARISON_IMAGE).map((id) => ({
  id,
  label: COMPARISON_IMAGE_LABEL[id]
}));

const comparisonModeOptions = Object.values(COMPARISON_MODE).map((id) => ({
  id,
  label: COMPARISON_MODE_LABEL[id]
}));

export default function Controls() {
  const [state, dispatch] = useStore();
  const {
    detectMotion,
    motionColor,
    colorNoiseTolerance,
    comparisonQuality,
    comparisonImage,
    comparisonMode,
    recordMotion,
    recordMotionPauseTolerance
  } = state;

  return (
    <div className="controls">
      <Divider>Motion detection</Divider>

      <div className="controls-item">
        <div className="controls-item__label">Detect motion</div>
        <Switch checked={detectMotion} onChange={() => dispatch(changeSetting('detectMotion', !detectMotion))} />
      </div>
      {detectMotion ? <>
        <div className="controls-item">
          <div className="controls-item__label">Motion color</div>
          <input type="color" value={rgbToHex(motionColor)} onChange={(ev) => dispatch(changeSetting('motionColor', hexToRgb(ev.target.value)))} />
        </div>
        <div className="controls-item">
          <div className="controls-item__label">Color noise tolerance</div>
          <Slider min={0} max={255} value={colorNoiseTolerance} onChange={(val) => dispatch(changeSetting('colorNoiseTolerance', val))} />
        </div>
        <div className="controls-item">
          <div className="controls-item__label">Comparison quality</div>
          <Slider min={1} max={MAX_COMPARISON_QUALITY} value={comparisonQuality} onChange={(val) => {
            dispatch(changeSetting('comparisonQuality', val));
            core.setComparisonQuality(val);
          }} />
        </div>
        <div className="controls-item">
          <div className="controls-item__label">Comparison image</div>
          <Select value={comparisonImage} onChange={(val) => dispatch(changeSetting('comparisonImage', val))}>
            {comparisonImageOptions.map(({ id, label }) => <Option key={id} value={id}>{label}</Option>)}
          </Select>
          {comparisonImage === COMPARISON_IMAGE.CUSTOM ? <Button
            className="c-overlay__background-frame"
            onClick={core.setBackgroundFrame}>
          Set background image
          </Button> : ''}
        </div>
        <div className="controls-item">
          <div className="controls-item__label">Comparison mode</div>
          <Select value={comparisonMode} onChange={(val) => dispatch(changeSetting('comparisonMode', val))}>
            {comparisonModeOptions.map(({ id, label }) => <Option key={id} value={id}>{label}</Option>)}
          </Select>
        </div>
      </> : '' }
      <Divider>Recording</Divider>
      <div className="controls-item">
        <div className="controls-item__label">Record motion</div>
        <Switch checked={recordMotion} onChange={() => dispatch(changeSetting('recordMotion', !recordMotion))} />
      </div>
      {recordMotion ? <>

        <div className="controls-item">
          <div className="controls-item__label">Motion pause tolerance</div>
          <Slider min={1} max={20} value={recordMotionPauseTolerance} onChange={(val) => {
            dispatch(changeSetting('recordMotionPauseTolerance', val));
            core.setComparisonQuality(val);
          }} />
        </div>
      </> : ''}
    </div>
  );
}
