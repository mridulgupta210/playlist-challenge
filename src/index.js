import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import './index.css';
import configureProvider from './common/store/configureProvider';
import App from './App';

ReactDOM.render(
  configureProvider(<App />),
  document.getElementById('root')
);
