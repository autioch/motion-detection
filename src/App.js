import Controls from './components/controls';
import ErrorLog from './components/errorLog';
import Sidebar from './components/sidebar';
import schema from './schema';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ErrorLog/>
      <Sidebar>
        <Controls schema={schema} />
      </Sidebar>
    </div>
  );
}

export default App;
