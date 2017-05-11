import { combineReducers } from 'redux';

// redux-form provides a reducer (named 'reducer') that we need to wire up on our state
// use 'as' syntax for naming clarity
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth_reducer';

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer
});

export default rootReducer;
