import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import gridReducer from './reducers/gridReducer';
import gridPageReducer from './reducers/grid_page_reducer';

export default createStore(
	combineReducers({
		form:formReducer,
		grid:gridReducer,
		gridPage:gridPageReducer
	}),applyMiddleware(thunk)
);