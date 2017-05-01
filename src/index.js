import { getUserMedia } from './utils';
import view from './view';
import storeFactory from './store';
import schema from './schema';

Object.keys(schema).forEach((key) => {
  schema[key].key = key;
});

const store = storeFactory(schema);

store.subscribe((state) => view(state));

getUserMedia().then((videoStream) => store.dispatch(({ source }) => ({
  source: Object.assign({}, source, {
    value: videoStream
  })
})));
