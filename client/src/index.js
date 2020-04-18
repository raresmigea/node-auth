import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Home from './components/Home';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" component={Home} />
    </App>
  </BrowserRouter>,
  document.querySelector('#root'));
serviceWorker.unregister();
