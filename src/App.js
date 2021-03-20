import Controls from './components/controls';
import ErrorLog from './components/errorLog';
import Motion from './components/motion';
import Overlay from './components/overlay';
import Sidebar from './components/sidebar';
import Video from './components/video';
import './App.scss';
import { useEffect } from 'react';
import { setVideoStream } from './reducer';
import { useStore } from './store';

import core from './core';

function App() {
  const [state, dispatch] = useStore();
  const { comparisonQuality } = state;

  useEffect(() => {
    core.setComparisonQuality(comparisonQuality);

    core.getUserMedia().then((videoStream) => {
      dispatch(setVideoStream(videoStream));
      core.setVideoStream(videoStream);
    });

    // empty array to make this effect run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="app__wrapper">
        <div className="app__content">
          <Video videoStream={state.videoStream} />
          <Motion/>
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
