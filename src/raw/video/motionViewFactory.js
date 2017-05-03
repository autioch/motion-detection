import tag from 'lean-tag';
import './styles';

export default function motionViewFactory() {
  const el = tag('.rect-view');

  function update(changedData) {
    el.style.display = changedData.changed ? 'block' : 'none';
    el.style.height = `${changedData.height}px`;
    el.style.width = `${changedData.width}px`;
    el.style.left = `${changedData.left}px`;
    el.style.top = `${changedData.top}px`;
  }

  return {
    el,
    update
  };
}
