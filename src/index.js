import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import rootReducer from './js/redux/reducers/index';
import App from './js/App';

import './css/bootstrap/bootstrap.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(rootReducer, applyMiddleware(promiseMiddleware(), thunk, createLogger()))}>
		<Router>
			<App />
	  </Router>
	</Provider>,
  document.getElementById('root'));
registerServiceWorker();
