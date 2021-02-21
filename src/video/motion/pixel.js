const el = {};

export default function PixelMotion({ color, width, height, quality, pixels }) {
  const context = el.getContext('2d');
  const COLOR = `rgba(${color.R}, ${color.G}, ${color.B}, 0.5)`;

  context.fillStyle = COLOR;
  context.clearRect(0, 0, width, height);

  for (let index = 0; index < pixels.length; index = index + 2) {
    context.fillRect(pixels[index], pixels[index + 1], quality, quality);
  }

  return (
    <canvas
      className="pixel-view"
      width={width}
      height={height}
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  );
}
