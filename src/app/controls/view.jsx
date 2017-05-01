import { h } from 'preact';
import controlFactory from './types';
import './styles';

export default function ControlsView({ controls, values, onChange }) {
  return (
    <div className="m-controls">
      {controls.map((control) => {
        const ControlComponent = controlFactory(control);

        return (
          <label className="control-item" key={control.key}>
            <span className="control-item__label">{control.label}</span>
            <ControlComponent item={control} value={values[control.key]} onChange={onChange}/>
          </label>
        );
      })}
    </div>
  );
}
