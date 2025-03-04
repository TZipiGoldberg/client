import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './features/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />  {/* אין צורך ב-BrowserRouter כאן כי כבר עטפנו את App ב-AppRouter */}
  </Provider>
);











