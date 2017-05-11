import { combineReducers } from 'redux';

// redux-form provides a reducer (named 'reducer') that we need to wire up on our state
// use 'as' syntax for naming clarity
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
	form // form: form
});

export default rootReducer;
