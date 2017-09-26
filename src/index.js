import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './js/redux/reducers/index';
import App from './js/App';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
		<Router>
			<App />
	  </Router>
	</Provider>,
  document.getElementById('root'));
registerServiceWorker();
