import Controls from './components/controls';
import ErrorLog from './components/errorLog';
import Sidebar from './components/sidebar';
import Video from './components/video';
import schema from './detector/schema';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ErrorLog/>
      <Sidebar>
        <Controls schema={schema} />
      </Sidebar>
      <Video />
    </div>
  );
}

export default App;
