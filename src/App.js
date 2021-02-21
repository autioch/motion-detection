import Controls from './controls';
import ErrorLog from './errorLog';
import Sidebar from './sidebar';
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
