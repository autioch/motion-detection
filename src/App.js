import Controls from './components/controls';
import ErrorLog from './components/errorLog';
import Sidebar from './components/sidebar';
import Video from './components/video';
import './App.scss';
import { useEffect } from 'react';
import { setVideoStream } from './reducer';
import getUserMedia from './core/getUserMedia';
import { useStore } from './store';

function App() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    getUserMedia().then((videoStream) => dispatch(setVideoStream(videoStream)));

    // empty array to make this effect run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Video videoStream={state.videoStream} />
      <ErrorLog/>
      <Sidebar>
        <Controls />
      </Sidebar>
    </div>
  );
}

export default App;
