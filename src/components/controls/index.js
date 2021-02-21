/* eslint-disable no-unused-vars, no-empty-function */
import { Switch, Slider, Select } from 'antd';

const { Option } = Select; // eslint-disable-line no-shadow

function ListSelect({ id, control }) {
  return (
    <Select>
      {control.options.map(({ value, label }, index) => <Option key={index} value={value}>{label}</Option>)}
    </Select>
  );
}

function RangeSlider({ id, control }) {
  return (
    <Slider onChange={() => {}} />
  );
}

function BoolSwitch({ id, control }) {
  return (
    <Switch onChange={() => {}} />
  );
}

function Color({ id, control }) {
  return (
    <input type="color" onChange={() => {}}/>
  );
}

const TYPES = {
  'boolean': BoolSwitch,
  range: RangeSlider,
  list: ListSelect,
  color: Color
};

function Item({ id, control }) {
  const Control = TYPES[control.type];

  return (
    <div className="controls-item">
      <div className="controls-item__label">{control.label}</div>
      <Control id={id} control={control} />
    </div>
  );
}

export default function Controls({ schema }) {
  const controls = Object.entries(schema);

  return (
    <div className="controls">
      {controls.map(([key, control]) => <Item key={key} id={key} control={control}/>)}
    </div>
  );
}
