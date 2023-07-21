import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './reducers/store';

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data?.error)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
