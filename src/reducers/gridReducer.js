import{
	CREATE_GRID_REQUEST,
	CREATE_GRID_ERROR,
	CREATE_GRID_SUCCESS,
	UPDATE_GRID_ARRAY,
	RESET_GRID_ARRAY
} from '../actions/createGrid';

const initialState = {
	rows: null,
	columns:null,
	loading:null,
	message:null,
	name:null,
	gridArray:null
};

function createGridArray(rows,columns){
	let gridArr = [];
	let rowArr = [];
	for(let i = 0;i < rows; i++){
		rowArr = [];
		for(let k = 0; k < columns;k++){
			rowArr.push(0);
		}
		gridArr.push(rowArr);
	}
	return gridArr;
}

export default function reducer(state = initialState,action){
	//console.log(state);
	if(action.type === CREATE_GRID_REQUEST){
		return Object.assign({},state,{
			loading:true,
			error:null,
			message:null
		});
	}
	else if(action.type === CREATE_GRID_SUCCESS){
		console.log("reducer success data", action.gridData);
		const gridArray = createGridArray(parseInt(action.gridData.rows),parseInt(action.gridData.columns));
		//console.log("reducer gridArray: ",gridArray);
		return Object.assign({},state,{
			loading:null,
			message:"success",
			error:null,
			name:action.gridData.gameName,
			rows:action.gridData.rows,
			columns:action.gridData.columns,
			gridArray
		});
	}
	else if(action.type === CREATE_GRID_ERROR){
		return Object.assign({},state,{
			loading:null,
			message:"error",
			error:action.error
		});
	}
	else if(action.type === UPDATE_GRID_ARRAY){
		if(state.gridArray[action.row][action.column] === 1){
			state.gridArray[action.row][action.column] = 0;
		}
		else if (state.gridArray[action.row][action.column] === 0){
			state.gridArray[action.row][action.column] = 1;
		}
		
		return Object.assign({},state,{
		});
	}
	else if(action.type === RESET_GRID_ARRAY){
		state.gridArray = createGridArray(state.rows,state.columns);
		return Object.assign({},state,{
		});
	}
	return state;
}
