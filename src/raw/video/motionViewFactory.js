import tag from 'lean-tag';
import './styles';

export default function motionViewFactory() {
  const el = tag('.rect-view');

  function update(changedData) {
    el.style.cssText = [
      `display:${changedData.changed ? 'block' : 'none'}`,
      `height:${changedData.height}px`,
      `width:${changedData.width}px`,
      `left:${changedData.left}px`,
      `top:${changedData.top}px`
    ].join(';');
  }

  return {
    el,
    update
  };
}
