import{
	CREATE_GRID_REQUEST,
	CREATE_GRID_ERROR,
	CREATE_GRID_SUCCESS,
	UPDATE_GRID_ARRAY,
	RESET_GRID_ARRAY,
	UPDATE_COLOR
} from '../actions/createGrid';

const initialState = {
	rows: null,
	columns:null,
	loading:null,
	message:null,
	name:null,
	gridArray:null,
	gridObjectArray:null
};

//maybe need to save the grid as a object so that we can associate color with each grid block and any other data that might need

function creatGridObjects(rows,columns){
	let gridArr = [];
	let rowObj = {};

	for(let i = 0;i < rows; i++){
		rowObj = {};
		for(let k = 0; k < columns;k++){
			rowObj["column" + k] = {state: 0,color:"#000000"};
		}
		gridArr.push(rowObj);
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
		const gridObjectArray = creatGridObjects(parseInt(action.gridData.rows),parseInt(action.gridData.columns));
		//console.log("reducer gridArray: ",gridArray);
		return Object.assign({},state,{
			loading:null,
			message:"success",
			error:null,
			name:action.gridData.gameName,
			rows:action.gridData.rows,
			columns:action.gridData.columns,
			gridObjectArray
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

		if(state.gridObjectArray[action.row]["column" + action.column].state === 1){
			state.gridObjectArray[action.row]["column" + action.column].state = 0;
		}
		else if (state.gridObjectArray[action.row]["column" + action.column].state === 0){
			state.gridObjectArray[action.row]["column" + action.column].state = 1;
		}
		
		return Object.assign({},state,{
		});
	}
	else if(action.type === RESET_GRID_ARRAY){
		state.gridObjectArray = creatGridObjects(parseInt(state.rows),parseInt(state.columns));
		return Object.assign({},state,{
		});
	}
	else if(action.type === UPDATE_COLOR){
		state.gridObjectArray[action.row]["column" + action.column].color = action.color;
		return Object.assign({},state,{
		});
	}
	return state;
}
