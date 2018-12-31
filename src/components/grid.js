import React from 'react';
import {connect} from 'react-redux';

export class Grid extends React.Component{
	componentDidMount() {
		console.log("test");
    }

    setRowData(numCol){
    	let returnArray = []
    	for(let i = 0; i < numCol;i++){
    		//console.log("run for",numCol);
    		returnArray.push({id:i});
    	}
    	return returnArray;
    }

    setColumnData(numRow){
    	let returnArray = []
    	for(let i = 0; i < numRow;i++){
    		//console.log("run for",numRow);

    		returnArray.push({id:i + " column"} );
    	}
    	return returnArray;
    }

	render(){
		//maybe need to save the column/row data as objects?
		//then for each row I can render the data then redner column data inside?
		let tableData = [];
		let columnData = [];
		let rowData = [];
		try{
			rowData = this.setRowData(this.props.gridData.rows);
			columnData = this.setColumnData(this.props.gridData.columns)
			console.log("column data", columnData);
			if(this.props.gridData.columns > 0 && this.props.gridData.rows > 0){
				console.log("construct table");
				tableData = rowData.map(row=>{
					return(
						<tr key={row.id}>
							{columnData.map(column => {
								return(
									<td key={column.id}>test{column.id}
									</td>
								);
							})}
						</tr>
					);
				});
			}
		}
		catch(err){
			tableData = [];
		}
		return(
			<div>
				<p>{this.props.gridData.name}</p>
				<table><tbody>{tableData}</tbody></table>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    gridData: state.grid
});

export default connect(mapStateToProps)(Grid)