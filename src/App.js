import './App.css';

import { BrowserRouter } from "react-router-dom";
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <BrowserRouter>
          <Navigation />
          <MainContent />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
