import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature/feature';
import RequireAuth from './components/auth/requireAuth'; // auth HOC
import Welcome from './components/welcome';
import reducers from './reducers/reducers';
import { AUTH_USER } from './actions/types';

// register redux-thunk middleware
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// init redux store
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
	// We need to update application state 
	// 		- call dispatch method on the store initialized above to fire off our auth action
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={ browserHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ Welcome }/>

				{/* When using nested routes, must render props.children in parent route to show child components */}
				<Route path="signin" component={ Signin }></Route>
				<Route path="signout" component={ Signout }></Route>	
				<Route path="signup" component={ Signup }></Route>	

				{/* Securing individual routes - wrap Feature component with our Higher Order Component */}
				<Route path="feature" component={ RequireAuth(Feature) }></Route>	
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container'));
