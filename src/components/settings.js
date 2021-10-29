/* eslint-disable max-len */
import { Switch, Slider, Select, Button, Divider } from 'antd';
import { useStore } from '../store';
import { changeSetting, setCurrentFrame, setComparisonQuality } from '../reducer';
import { MAX_COMPARISON_QUALITY, COMPARISON_IMAGE, COMPARISON_IMAGE_LABEL, COMPARISON_MODE, COMPARISON_MODE_LABEL } from '../consts'; // eslint-disable-line no-shadow
import { internalToHex, hexToInternal, dictToOptions } from '../utils';

const comparisonImageOptions = dictToOptions(COMPARISON_IMAGE, COMPARISON_IMAGE_LABEL);
const comparisonModeOptions = dictToOptions(COMPARISON_MODE, COMPARISON_MODE_LABEL);

function SettingSwitch({ label, setting, checked, dispatch }) {
  return (
    <div className="c-settings-item">
      <div className="c-settings-item__label">{label}</div>
      <Switch checked={checked} onChange={() => dispatch(changeSetting(setting, !checked))} />
    </div>
  );
}

function SettingSlider({ label, setting, min, max, value, dispatch }) {
  return (
    <div className="c-settings-item">
      <div className="c-settings-item__label">{label}</div>
      <Slider min={min} max={max} value={value} onChange={(val) => dispatch(changeSetting(setting, val))} />
    </div>
  );
}

function MotionSettings({ dispatch, motionColor, colorNoiseTolerance, comparisonQuality, comparisonImage, comparisonMode }) {
  return (
    <>
      <div className="c-settings-item">
        <div className="c-settings-item__label">Motion color</div>
        <input type="color" value={internalToHex(motionColor)} onChange={(ev) => dispatch(changeSetting('motionColor', hexToInternal(ev.target.value)))} />
      </div>
      <SettingSlider label="Color difference tolerance" min={0} max={255} value={colorNoiseTolerance} setting="colorNoiseTolerance" dispatch={dispatch}/>
      <div className="c-settings-item">
        <div className="c-settings-item__label">Comparison quality</div>
        <Slider min={1} max={MAX_COMPARISON_QUALITY} value={comparisonQuality} onChange={(val) => {
          dispatch(changeSetting('comparisonQuality', val));
          dispatch(setComparisonQuality(val));
        }} />
      </div>
      <div className="c-settings-item">
        <div className="c-settings-item__label">Comparison image</div>
        <Select value={comparisonImage} onChange={(val) => dispatch(changeSetting('comparisonImage', val))}>
          {comparisonImageOptions.map(({ id, label }) => <Select.Option key={id} value={id}>{label}</Select.Option>)}
        </Select>
        {comparisonImage === COMPARISON_IMAGE.CUSTOM ? <Button className="c-overlay__background-frame" onClick={() => dispatch(setCurrentFrame())}>Set background image</Button> : ''}
      </div>
      <div className="c-settings-item">
        <div className="c-settings-item__label">Comparison mode</div>
        <Select value={comparisonMode} onChange={(val) => dispatch(changeSetting('comparisonMode', val))}>
          {comparisonModeOptions.map(({ id, label }) => <Select.Option key={id} value={id}>{label}</Select.Option>)}
        </Select>
      </div>
    </>
  );
}

function RecordSettings({ dispatch, recordMotionPauseTolerance }) {
  return (
    <>
      <SettingSlider label="Motion pause tolerance" min={1} max={20} value={recordMotionPauseTolerance} setting="recordMotionPauseTolerance" dispatch={dispatch}/>
    </>
  );
}

export default function Settings() {
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
    <div className="c-settings">
      <Divider>Motion detection</Divider>
      <SettingSwitch label="Detect motion" checked={detectMotion} setting="detectMotion" dispatch={dispatch} />
      {detectMotion ? <MotionSettings
        dispatch={dispatch}
        motionColor={motionColor}
        colorNoiseTolerance={colorNoiseTolerance}
        comparisonQuality={comparisonQuality}
        comparisonImage={comparisonImage}
        comparisonMode={comparisonMode}
      /> : '' }
      <Divider>Recording</Divider>
      <SettingSwitch label="Record motion" checked={recordMotion} setting="recordMotion" dispatch={dispatch} />
      {recordMotion ? <RecordSettings dispatch={dispatch} recordMotionPauseTolerance={recordMotionPauseTolerance} /> : ''}
    </div>
  );
}
