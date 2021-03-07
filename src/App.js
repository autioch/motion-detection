import Controls from './components/controls';
import ErrorLog from './components/errorLog';
import Sidebar from './components/sidebar';
import Video from './components/video';
import Overlay from './components/overlay';
import RectMotion from './components/rectMotion';
import './App.scss';
import { useEffect } from 'react';
import { setVideoStream } from './reducer';
import { useStore } from './store';

import thing from './thing';

function App() {
  const [state, dispatch] = useStore();
  const { detectMotion, comparisonQuality } = state;

  useEffect(() => {
    thing.setComparisonQuality(comparisonQuality);

    thing.getUserMedia().then((videoStream) => {
      dispatch(setVideoStream(videoStream));
      thing.setVideoStream(videoStream);
    });

    // empty array to make this effect run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="app__wrapper">
        <div className="app__content">
          <Video videoStream={state.videoStream} />
          {detectMotion ? <RectMotion /> : ''}
        </div>
      </div>
      <Overlay/>
      <ErrorLog/>
      <Sidebar>
        <Controls />
      </Sidebar>
    </div>
  );
}

export default App;
