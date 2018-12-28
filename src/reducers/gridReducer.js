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
	return state;
}
