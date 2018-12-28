import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import gridReducer from './reducers/gridReducer';

export default createStore(
	combineReducers({
		form:formReducer,
		grid:gridReducer
	}),applyMiddleware(thunk)
);