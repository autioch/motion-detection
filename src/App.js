import Controls from './components/controls';
import ErrorLog from './components/errorLog';
import Sidebar from './components/sidebar';
import Video from './components/video';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ErrorLog/>
      <Sidebar>
        <Controls />
      </Sidebar>
      <Video />
    </div>
  );
}

export default App;
