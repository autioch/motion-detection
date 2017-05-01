const scrollWidth = 32;
const minWidthRatio = 0.1;
const ratio = 0.75;

export default function getWidthOption() {
  // space for scroll
  let width = window.innerWidth - scrollWidth;
  const height = window.innerHeight - scrollWidth;

  if (width > height) {
    width = height / ratio;
  }

  return {
    min: Math.round(width * minWidthRatio),
    max: Math.round(width)
  };
}
