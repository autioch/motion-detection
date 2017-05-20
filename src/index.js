import detectorFactory from 'core';
import { config, schema } from 'core/config';
import { getUserMedia, interval } from 'utils';
import videoViewFactory from 'view/video';
import sidebarViewFactory from 'view/sidebar';
import './styles';

getUserMedia()
  .then((videoStream) => {
    const detector = detectorFactory(config);
    const videoView = videoViewFactory(detector, videoStream);
    const controls = Object.keys(schema).map((key) => schema[key]);

    function syncConfig(key, value) {
      if (key === 'width') {
        detector.updateConfig({
          height: Math.round(value * 0.75),
          width: value
        });
      } else {
        detector.updateConfig({
          [key]: value
        });
      }
      videoView.updateConfig();
    }

    const sidebarView = sidebarViewFactory(controls, syncConfig);

    document.body.appendChild(videoView.el);
    document.body.appendChild(sidebarView.el);
    interval(videoView.updateMotion);
  });
