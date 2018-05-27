import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Session from 'Carrier/Session.js'
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
