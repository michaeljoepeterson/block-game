
export const CREATE_GRID_REQUEST = "CREATE_GRID_REQUEST";

export const create_grid_request = () =>({
	type:CREATE_GRID_REQUEST
});

export const CREATE_GRID_SUCCESS = "CREATE_GRID_SUCCESS";

export const create_grid_success = (gridData) =>({
	type:CREATE_GRID_SUCCESS,
	gridData
});

export const CREATE_GRID_ERROR = "CREATE_GRID_ERROR";

export const create_grid_error = () =>({
	type:CREATE_GRID_ERROR
});

//need a function to just update the state of the grid because eventually db would be called and data sent there and then update what the user sees or other way around
export const UPDATE_GRID = "UPDATE_GRID";

export const update_grid = (gridData) =>({
	type:UPDATE_GRID,
	gridData
});

export const UPDATE_GRID_ARRAY = "UPDATE_GRID_ARRAY";

export const updateGridArray = (row,column) => ({
	type:UPDATE_GRID_ARRAY,
	row,
	column
});

export const createGrid = (gridData) => (dispatch,getState) => {
	dispatch(create_grid_request());
	dispatch(create_grid_success(gridData));
}