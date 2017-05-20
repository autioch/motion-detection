import detectorFactory from 'detector';
import { config, schema } from 'detector/config';
import { getUserMedia } from 'utils';
import appViewFactory from './view';
import './styles';

getUserMedia()
  .then((videoStream) => {
    const detector = detectorFactory(config);
    const controls = Object.keys(schema).map((key) => schema[key]);

    appViewFactory(detector, videoStream, controls);
  })
  .catch((err) => alert(err.message)); // eslint-disable-line no-alert
