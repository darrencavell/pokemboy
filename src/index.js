import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import * as registerServiceWorker from './lib/registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker.register();
