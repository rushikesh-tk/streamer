import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'tachyons';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
 document.querySelector('#root'));