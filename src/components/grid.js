import React from 'react';
import {connect} from 'react-redux';
import "./grid.css";

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

    		returnArray.push({id:i} );
    	}
    	return returnArray;
    }
    //need to rethink how the row/column data saved due to issues with double digit grids
    //ie when grid double digits can have multiple spaces where grid button id is the same
    gridButtonClicked(event){
    	event.preventDefault();
    	//console.log(event.target.dataset.row)
    	//console.log(event.target.dataset.column)
    	let buttonId = event.target.id;
    	console.log("button clicked, id: ",event.target.id);
    	let targetButton = document.getElementById(buttonId);
    	if(!targetButton.classList.contains("gridButtonClicked")){
    		targetButton.classList.add("gridButtonClicked");
    	}
    	else{
    		targetButton.classList.remove("gridButtonClicked");
    	}
    }

    resetButtons(){
    	let elemntArray = document.getElementsByClassName("gridButton");
    	for(let i = 0;i<elemntArray.length;i++){
    		console.log("Reset button id: ",elemntArray[i].id);
    		//console.log("Reset button id: ",elemntArray[i].classList);
    		//targetButton = 
    		if(elemntArray[i].classList.contains("gridButtonClicked")){
    			elemntArray[i].classList.remove("gridButtonClicked");
    		}
    	}
    }

	render(){
		//maybe need to save the column/row data as objects?
		//then for each row I can render the data then redner column data inside?
		let tableData = [];
		let columnData = [];
		let rowData = [];
		let resetButton;
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
									<td 
									key={row.id + column.id}><button id={"row" + row.id.toString() + " " + "column" + column.id.toString()} className="gridButton" data-row={row.id} data-column={column.id}
									onClick={(e)=>this.gridButtonClicked(e)}
									></button>
									</td>
								);
							})}
						</tr>
					);
				});
				//this.resetButtons();
				resetButton = <button className="resetButton" onClick={e=>this.resetButtons(e)}>Reset</button>
			}
		}
		catch(err){
			tableData = [];
		}
		return(
			<div>
				<p>{this.props.gridData.name}</p>
				<table className="gridTable"><tbody>{tableData}</tbody></table>
				{resetButton}
			</div>
		);
	}
}

const mapStateToProps = state => ({
    gridData: state.grid
});

export default connect(mapStateToProps)(Grid)