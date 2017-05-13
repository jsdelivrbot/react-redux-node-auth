import axios from 'axios'; // http package
import { browserHistory } from 'react-router'; // programmatic navigation
import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	FETCH_MESSAGE
} from './types'; // action-type constants file

const API_ROOT = 'http://localhost:3090';

export function signinUser({ email, password }) {
	// redux-thunk middleware package allows us to return a function from an action-creator
	// Gets us DIRECT access to the redux dispatch method (automatically passed in as param to this function)
	// Dispatch method pipes action through reducers

	return function (dispatch) {
		// Can do anything in here (async included)...then manually dispatch our action at any time

		// Submit email/passowrd to the api
		axios.post(`${ API_ROOT }/signin`, { email, password })
			.then(response => {
				// If successful..
				// - update state to indicate user is authenticated
				// 			+ dispatch action to flip our 'auth' state property to TRUE
				dispatch({ type: AUTH_USER });

				// - save JWT token for future requests in browser local storage
				localStorage.setItem('token', response.data.token);

				// - redirect to '/feature' route using react-router
				browserHistory.push('/feature');
			})
			.catch(() => {
				// If bad request..
				// - show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	}
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ API_ROOT }/signup`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/feature');
			})
			.catch(response => {
				dispatch(authError(response.data.error));
			});
	}
}

// action-creator to signal an authentication error
export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

// sign out action-creator
export function signoutUser() {
	// delete the stored token
	localStorage.removeItem('token');
	
	return {
		type: UNAUTH_USER
	};
}

export function fetchMessage() {
	return function(dispatch) {
		axios.get(API_ROOT, {
			// options object - add JWT in header of request
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
				});
			})
			.catch();
	}
}
