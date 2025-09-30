import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from '../MainRouter';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <MainRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
