import { videoViewFactory, logViewFactory, configViewFactory } from './views';
import { getUserMedia, setupConfig } from './utils';
import config from './config';

const container = document.body;

const logView = logViewFactory();

setupConfig(config, () => logView.log('change'));

const videoView = videoViewFactory(config);

container.appendChild(videoView.el);
container.appendChild(configViewFactory(config).el);
container.appendChild(logView.el);

getUserMedia().then((videoStream) => videoView.play(videoStream));
