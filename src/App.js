/* eslint-disable max-len */
import Settings from './components/settings';
import Motion from './components/motion';
import { Drawer, Button } from 'antd';
import './App.scss';
import { useEffect, useState, useRef } from 'react';
import { takeScreenshot, toggleRecording, setupVideo } from './reducer';
import { useStore } from './store';
import { RECORD_MODE_LABEL } from './consts';
import { getFps, getUserMedia } from './utils';

const startPlaying = (ev) => ev.target.play();

// possible states:
// - filenme downloaded
// el.textContent = 'Recording...';
// el.textContent = 'Recording stopped.';
// el.textContent = 'Recording waiting...';

function App() {
  const [state, dispatch] = useStore();
  const { videoStream, lastRender, currentRender, recorderState, detectMotion, videoWidth, videoHeight } = state;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);
  const refVideo = useRef(null);

  // empty array to make this effect run only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getUserMedia().then((newVideoStream) => dispatch(setupVideo(refVideo.current, newVideoStream))), []);
  useEffect(() => refVideo.current && (refVideo.current.srcObject = videoStream), [videoStream]);

  return (
    <div className="App">
      <div className="app__wrapper">
        <div className="app__content">
          <video
            className="c-video"
            onLoadedMetadata={startPlaying}
            ref={refVideo}
            width={videoWidth}
            height={videoHeight}
            srcObject={videoStream}
          />
          {detectMotion ? <Motion width={videoWidth} height={videoHeight}/> : ''}
        </div>
      </div>
      <div className="c-overlay">
        <div className="c-overlay__tr">
          <Button onClick={() => dispatch(takeScreenshot())}>Screenshot</Button>
          <Button onClick={() => dispatch(toggleRecording())}>Record video</Button>
        </div>
        <div className="c-overlay__br">

          <span className="c-overlay__text">{getFps(lastRender, currentRender)} FPS</span>
          <span className="c-overlay__text">{RECORD_MODE_LABEL[recorderState]}</span>
        </div>
      </div>
      <Button type="primary" className="c-sidebar-toggle" onClick={showDrawer}>Settings</Button>
      <Drawer
        title="Settings"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        {visible ? <Settings /> : ''}
      </Drawer>
    </div>
  );
}

export default App;
