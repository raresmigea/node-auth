import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
    <BrowserRouter>
      <App>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/dashboard' component={Dashboard} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
serviceWorker.unregister();
