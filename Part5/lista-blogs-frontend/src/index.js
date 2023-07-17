import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data?.error)
);


ReactDOM.createRoot(document.getElementById('root')).render(<App />);