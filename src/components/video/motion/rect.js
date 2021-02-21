export default function RectMotion({ color, changedData }) {
  return (
    <div
      className="rect-view"
      style={{
        background: `rgba(${color.R}, ${color.G}, ${color.B}, 0.5)`,
        width: `${changedData.width}px`,
        height: `${changedData.height}px`,
        left: `${changedData.left}px`,
        top: `${changedData.top}px`
      }}
    />
  );
}
