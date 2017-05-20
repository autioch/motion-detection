import tag from 'lean-tag';

export default function rectMotionView(color, width, height, quality) {
  const el = tag('canvas.pixel-view', {
    width,
    height,
    style: {
      width: `${width}px`,
      height: `${height}px`
    }
  });

  const context = el.getContext('2d');
  const COLOR = `rgba(${color.R}, ${color.G}, ${color.B}, 0.5)`;

  function show({ pixels }) {
    el.style.display = 'block';
    context.fillStyle = COLOR;
    context.clearRect(0, 0, width, height);
    for (let index = 0; index < pixels.length; index = index + 2) {
      context.fillRect(pixels[index], pixels[index + 1], quality, quality);
    }
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
