import React from 'react';
import {connect} from 'react-redux';
import CreateGridForm from "./create_grid_form";

export function GridPage(props){
	return(
		<div className="container center">
			<CreateGridForm/>
			
		</div>
	)
}

export default(GridPage);