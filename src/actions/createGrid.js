
export const CREATE_GRID_REQUEST = "CREATE_GRID_REQUEST";

export const create_grid_request = () =>({
	type:CREATE_GRID_REQUEST
});

export const CREATE_GRID_SUCCESS = "CREATE_GRID_SUCCESS";

export const create_grid_success = () =>({
	type:CREATE_GRID_SUCCESS
});

export const CREATE_GRID_ERROR = "CREATE_GRID_ERROR";

export const create_grid_error = () =>({
	type:CREATE_GRID_ERROR
});

export const createGrid = (gridData) => (dispatch,getState) => {
	dispatch(create_grid_request());
	dispatch(create_grid_success());
}