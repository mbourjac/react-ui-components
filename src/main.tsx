import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import 'highlight.js/styles/github-dark.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
