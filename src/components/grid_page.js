import React from 'react';
import {connect} from 'react-redux';
import CreateGridForm from "./create_grid_form";
import Grid from "./grid";

export function GridPage(props){
	console.log("rendered");
	return(
		<div className="container center">
			<CreateGridForm/>
			<Grid/>
		</div>
	)
}

export default(GridPage);