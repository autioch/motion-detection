import listView from './list';
import rangeView from './range';
import booleanView from './boolean';
import './index.scss';

const views = {
  boolean: booleanView,
  range: rangeView,
  list: listView
};

const container = document.querySelector('.js-controls');

function toggleWide(width) {
  const wideVideo = (width > window.innerWidth * 0.7);
  document.body.classList[wideVideo ? 'add' : 'remove']('is-wide-video');
}

function updateControlsView(config) {
  toggleWide(config.width);
}

export default function ControlViewFactory(configStore) {
  configStore.forEach(function(item) {
    const view = views[item.type](configStore, item);
    view.render();
    container.appendChild(view.el);
  });

  updateControlsView({
    width: configStore.getWidth()
  });

  configStore.onWidth(updateControlsView);

  window.addEventListener('resize', function() {
    toggleWide(configStore.getWidth());
  });
}
