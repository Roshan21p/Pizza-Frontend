import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          success: {
            duration: 3000 //  auto dismiss
          },
          error: {
            duration: 3000 //  auto dismiss
          },
          loading: {
            duration: Infinity // stay until resolved
          }
        }}
      />
    </BrowserRouter>
  </Provider>
);
