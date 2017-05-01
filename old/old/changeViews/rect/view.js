import './index.scss';

export default function RectViewFactory() {
  let timeTolerance;
  let isInMotion = false;
  let lastMotion = performance.now();
  let lastStatic = performance.now();
  const el = document.createElement('div');

  el.classList.add('rect-view');

  function show() {
    el.classList.remove('is-hidden');
  }

  function hide() {
    el.classList.add('is-hidden');
  }

  function exit() {
    el.remove();
  }

  function render(changedData) {
    el.style.transform = `translate(${changedData.left}px,${changedData.top}px)`;
    el.style.height = `${changedData.height}px`;
    el.style.width = `${changedData.width}px`;
  }

  function update(changedData) {
    const currentTime = performance.now();

    if (changedData.changed) {
      if (currentTime - lastStatic > timeTolerance) {
        isInMotion = true;
        lastMotion = currentTime;
      }
      if (isInMotion) {
        show();
        render(changedData);
      }
    } else if (currentTime - lastMotion > timeTolerance) {
      if (isInMotion) {
        hide();
        lastStatic = currentTime;
      }
      isInMotion = false;
    }
  }

  function init(config) {
    timeTolerance = config.timeTolerance;
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
      timeTolerance: init
    }
  };
}
