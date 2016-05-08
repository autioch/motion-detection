export default function ImageCacheFactory() {
  let width;
  let height;
  let data1;
  let data2;
  let el = document.createElement('canvas');
  let parentEl = document.querySelector('.js-controls');
  el.classList.add('cache__canvas');
  let context = el.getContext('2d');

  function toggleCanvas(config) {
    if (config.compareCanvas) {
      parentEl.appendChild(el);
    } else {
      el.remove();
    }
  }

  function init(config) {
    width = Math.round(config.width / config.quality);
    height = Math.round(width / 4 * 3);
    el.width = width;
    el.height = height;
    data1 = data2 = null;
    toggleCanvas(config);
  }

  function add(image) {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    data1 = data2;
    data2 = context.getImageData(0, 0, width, height).data;
  }

  function get() {
    return {
      data1,
      data2
    };
  }

  function exit() {
    width = height = data1 = data2 = el = context = null;
  }

  return {
    api: {
      init,
      add,
      get,
      exit
    },
    watch: {
      width: init,
      quality: init,
      compareCanvas: toggleCanvas
    }
  };
}
