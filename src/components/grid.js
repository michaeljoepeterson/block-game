import React from 'react';
import {connect} from 'react-redux';

export class Grid extends React.Component{
	componentDidMount() {
		console.log("test");
    }
	render(){
		return(
			<div>
				<p>{this.props.gridData.name}</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    gridData: state.grid
});

export default connect(mapStateToProps)(Grid)