import axios from 'axios'; // http package

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
	// redux-thunk middleware package allows us to return a function from an action-creator
	// Gets us DIRECT access to the redux dispatch method (automatically passed in as param to this function)
	// Dispatch method pipes action through reducers

	return function(dispatch) {
		// Can do anything in here (async included)...then manually dispatch our action at any time

		// Submit email/passowrd to the api
		axios.post(`${API_URL}/signin`, { email, password });

		// If success..
		// - update state to authenticated
		// - save JWT token for future requests
		// - redirect to '/feature' route

		// If bad request..
		// - show an error to the user
	}
}
