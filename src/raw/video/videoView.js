import tag from 'lean-tag';
import './styles';

export default function videoViewFactory() {
  const el = tag('video', {
    onloadedmetadata: (ev) => ev.target.play()
  });

  function update(width, height, source) {
    el.srcObject = source;
    el.width = width;
    el.height = height;
  }

  return {
    el,
    update
  };
}
