import videoViewFactory from 'view/video';
import sidebarViewFactory from 'view/sidebar';

const container = document.body;

export default function appView(detector, videoStream, controls) {
  function syncConfig(key, value) {
    detector.updateConfig({
      [key]: value
    });

    videoView.updateConfig(); // eslint-disable-line no-use-before-define
  }

  const videoView = videoViewFactory(detector, videoStream);
  const sidebarView = sidebarViewFactory(controls, syncConfig);

  container.appendChild(videoView.el);
  container.appendChild(sidebarView.el);
}
