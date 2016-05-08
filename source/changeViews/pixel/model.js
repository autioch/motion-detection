export default function RectModelFactory() {

  let quality,
    pixels,
    changed;

  function reset() {
    pixels = [];
    changed = false;
  }

  function set(col, row) {
    changed = true;
    pixels.push(col * quality, row * quality);
  }

  function get() {
    return {
      pixels,
      changed
    };
  }

  function init(config) {
    quality = config.quality;
  }

  reset();

  return {
    api: {
      get,
      set,
      reset,
      init
    },
    watch: {
      quality: init
    }
  };
}
