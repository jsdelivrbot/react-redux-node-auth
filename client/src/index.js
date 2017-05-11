import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import reducers from './reducers';

// register redux-thunk middleware
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
	<Provider store={ createStoreWithMiddleware(reducers) }>
		<Router history={ browserHistory }>
			<Route path="/" component={ App }>
				{/* When using nested routes, must render props.children in parent route to show child components */}
				<Route path="signin" component={ Signin }></Route>
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container'));
