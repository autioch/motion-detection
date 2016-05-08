export default function RectModelFactory() {

  let quality,
    top,
    left,
    bottom,
    right,
    changed;

  function reset() {
    top = Infinity;
    left = Infinity;
    bottom = 0;
    right = 0;
    changed = false;
  }

  function set(col, row) {
    changed = true;
    if (col < left) {
      left = col;
    }
    if (col > right) {
      right = col;
    }
    if (row < top) {
      top = row;
    }
    if (row > bottom) {
      bottom = row;
    }
  }

  function get() {
    return {
      top: top * quality,
      left: left * quality,
      height: (bottom - top) * quality,
      width: (right - left) * quality,
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
