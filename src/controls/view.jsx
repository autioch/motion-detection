import { h } from 'preact';
import ItemView from './item';

export default function ControlsView({ controls }) {
  return (
    <div>
      {controls.map(ItemView)}
    </div>
  );
}
