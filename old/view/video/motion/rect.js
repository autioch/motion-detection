/* eslint max-len: 0 */
import tag from 'lean-tag';

export default function rectMotionView(color) {
  const el = tag('.rect-view');
  const COLOR = `rgba(${color.R}, ${color.G}, ${color.B}, 0.5)`;

  function show(changedData) {
    el.style.cssText = `background:${COLOR};height:${changedData.height}px;width:${changedData.width}px;left:${changedData.left}px;top:${changedData.top}px`;
  }

  function hide() {
    el.style.display = 'none';
  }

  return {
    el,
    show,
    hide
  };
}
