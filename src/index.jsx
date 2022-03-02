import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

const baseName = (window.location.hostname.search(/github\.io/i) != -1) ? '/panier-achats' : '';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('racine')
);