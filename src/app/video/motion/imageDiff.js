const PIXEL_SIZE = 4;

export default function ImageDiffFactory() {
  let width,
      height,
      length,
      colorTolerance;

  function init(config) {
    width = Math.round(config.width / config.quality);
    height = Math.round(width / 4 * 3);
    length = width * height * PIXEL_SIZE;
    colorTolerance = config.colorTolerance;
  }

  function diff(colorDiff) {
    return (colorDiff > colorTolerance) || (colorDiff < -colorTolerance);
  }

  function check(model, { data1, data2 }) {
    if (data1 && data2) {
      for (let i = 0; i < length; i = i + PIXEL_SIZE) {
        if (diff(data1[i] - data2[i]) || diff(data1[i + 1] - data2[i + 1]) || diff(data1[i + 2] - data2[i + 2])) {
          model.set((i / PIXEL_SIZE) % width, Math.floor(i / PIXEL_SIZE / width));
        }
      }
    }
  }

  return {
    api: {
      init,
      check
    },
    watch: {
      quality: init,
      width: init,
      colorTolerance: init
    }
  };
}
