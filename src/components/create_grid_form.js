import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {createGrid} from "../actions/createGrid";
import {required,nonEmpty} from "../validator";

export class CreateGridForm extends React.Component{

	onSubmit(values){
		//console.log(values);
		return(this.props.dispatch(createGrid(values)))
	}
	//can add a normalize function to component to have name change with typing

	render(){
		return(
			<form className="grid-form"
			onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
			<label htmlFor="gameName">Game Name</label>
				<Field 
					component = {Input}
					type="text"
					min="0"
					max="50"
					name="gameName"
					validate={[required,nonEmpty]}
				/>
				<label htmlFor="columns">Columns</label>
				<Field 
					component = {Input}
					type="number"
					min="0"
					max="50"
					name="columns"
					validate={[required,nonEmpty]}

				/>
				<label htmlFor="rows">Rows</label>
				<Field 
					component = {Input}
					type="number"
					min="0"
					max="50"
					name="rows"
					validate={[required,nonEmpty]}
				/>
				<button disabled={this.props.pristine||this.props.submitting}>
                    submit
                </button>
            </form>
		);
	}
}

export default reduxForm({
	form:"CreateGrid",
	onSubmitFail:(errors,dispatch) => dispatch(focus('CreateGrid'))
})(CreateGridForm);