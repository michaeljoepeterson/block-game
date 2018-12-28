import{
	CREATE_GRID_REQUEST,
	CREATE_GRID_ERROR,
	CREATE_GRID_SUCCESS
} from '../actions/createGrid';

const initialState = {
	rows: null,
	columns:null,
	loading:null,
	message:null
};

export default function reducer(state = initialState,action){
	console.log(state);
	if(action.type === CREATE_GRID_REQUEST){
		return Object.assign({},state,{
			loading:true,
			error:null,
			message:null
		});
	}
	else if(action.type === CREATE_GRID_SUCCESS){
		return Object.assign({},state,{
			loading:null,
			message:"success",
			error:null
		})
	}
	else if(action.type === CREATE_GRID_ERROR){
		return Object.assign({},state,{
			loading:null,
			message:"error",
			error:action.error
		})
	}
	return state;
}
