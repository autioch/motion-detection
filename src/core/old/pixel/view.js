import './index.scss';

const COLOR = 'rgba(255,0,255, 0.8)';

export default function RectViewFactory() {
  let quality;
  let width;
  let height;
  const el = document.createElement('canvas');
  const context = el.getContext('2d');

  el.classList.add('pixel-view');

  function show() {
    el.classList.remove('is-hidden');
  }

  function hide() {
    el.classList.add('is-hidden');
  }

  function exit() {
    el.remove();
  }

  // http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
  function render(pixels) {
    context.fillStyle = COLOR;
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < pixels.length; i = i + 2) {
      context.fillRect(pixels[i], pixels[i + 1], quality, quality);
    }
  }

  function update(changedData) {
    if (changedData.changed) {
      show();
      render(changedData.pixels);
    } else {
      hide();
    }
  }

  function setQuality(config) {
    quality = config.quality;
  }

  function init(config) {
    width = config.width;
    height = width / 4 * 3;
    el.width = width;
    el.height = height;
    setQuality(config);
  }

  return {
    api: {
      el,
      show,
      hide,
      update,
      init,
      exit
    },
    watch: {
      width: init,
      quality: setQuality
    }
  };
}
