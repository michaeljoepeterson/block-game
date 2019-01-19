import React from 'react';
import {connect} from 'react-redux';
import CreateGridForm from "./create_grid_form";
import Grid from "./grid";
import {change_grid_type} from "../actions/gridPage";

export class GridPage extends React.Component{
	setGridChoice(event){
		event.preventDefault();
		console.log("Changed grid type: ",event.target.value);
		this.props.dispatch(change_grid_type(event.target.value));

	} 
	render(){
		console.log(this.props.gridChoice);
	return(
		<div className="container center">
			<button onClick={(e) => this.setGridChoice(e)} value="map">Map</button>
			<button onClick={(e) => this.setGridChoice(e)} value="character">Character</button>
			<button onClick={(e) => this.setGridChoice(e)} value="object">Object</button>
			<CreateGridForm/>
			<Grid/>
		</div>
		)

	}

}

const mapStateToProps = state => ({
    gridChoice: state.gridPage.gridChoice
});

export default connect(mapStateToProps)(GridPage);
