import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './global_styles.css';
import App from './components/App/App';
import { createStore } from './store';

const store = createStore({});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
