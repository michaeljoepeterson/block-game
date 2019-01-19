import{
	CHANGE_GRID_TYPE
} from '../actions/gridPage';

const initialState = {
	gridChoice:null
};

export default function reducer(state = initialState,action){
	
	if(action.type === CHANGE_GRID_TYPE){
		console.log("Reducer" ,action.choice);
		return Object.assign({},state,{
			gridChoice:action.choice
		});
	}

	return state;
}