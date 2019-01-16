import React from 'react';
import {connect} from 'react-redux';
import {updateGridArray,resetGridArray} from '../actions/createGrid';
import "./grid.css";

export class Grid extends React.Component{
	constructor(props){
		super(props);
		this.gridButtonClickState = false;
	}

	componentDidMount() {
		console.log("test");
    }

    setRowData(numCol){
    	let returnArray = []
    	for(let i = 0; i < numCol;i++){
    		returnArray.push({id:i});
    	}
    	return returnArray;
    }

    setColumnData(numRow){
    	let returnArray = []
    	for(let i = 0; i < numRow;i++){

    		returnArray.push({id:i} );
    	}
    	return returnArray;
    }

   	renderGrid(){
   		console.log("Grid Array Render: ", this.props.gridData.gridArray);
   		for(let i =0;i < this.props.gridData.gridArray.length; i++){
   			for(let k = 0;k < this.props.gridData.gridArray[i].length;k++){
   				let gridId = "row" + i + " column" + k;
   				let targetButton = document.getElementById(gridId);

   				if(this.props.gridData.gridArray[i][k] === 1){
   					targetButton.classList.add("gridButtonClicked");
   				}
   				else{
   					//targetButton.classList.remove("gridButtonClicked");
   				}
   			}
   		}

   	}
    //will need to convert the grid array to data that can be used to color the squares
    //idea is that while dragging see if the mouse went over the grid block then save that info in array data
    //then go through that array and color the corresponding squares
    gridButtonMouseOver(event){
    	event.preventDefault();
    	console.log("the mouse is over: ",event.target.id);
    	console.log("mouse over row: ", event.target.dataset.row);
    	console.log("mouse over column: ", event.target.dataset.column);
    	const row = event.target.dataset.row;
    	const column = event.target.dataset.column;
    	//setting the data will be like this.props.gridData.gridArray[row][column]
    	if(this.gridButtonClickState === true){
    		this.props.dispatch(updateGridArray(row,column));
    	}
    }

    gridbuttonMouseUp(event){
    	event.preventDefault();
    	this.gridButtonClickState = false;
    	console.log("mouse up, variable state: ",this.gridButtonClickState);
    }

    gridButtonMouseDown(event){
    	event.preventDefault();
    	this.gridButtonClickState = true;
    	console.log("mouse held down, variable state: ",this.gridButtonClickState);
    }

    gridButtonClicked(event){
    	event.preventDefault();
    	let buttonId = event.target.id;
    	console.log("button clicked, id: ",event.target.id);
    	const row = event.target.dataset.row;
    	const column = event.target.dataset.column;
    	let targetButton = document.getElementById(buttonId);

    	if(!targetButton.classList.contains("gridButtonClicked")){
    		targetButton.classList.add("gridButtonClicked");
    	}
    	else{
    		targetButton.classList.remove("gridButtonClicked");
    	}
    	this.props.dispatch(updateGridArray(row,column));
    }

    resetButtons(){
    	let elemntArray = document.getElementsByClassName("gridButton");
    	for(let i = 0;i<elemntArray.length;i++){
    		//console.log("Reset button id: ",elemntArray[i].id);
    		//console.log("Reset button id: ",elemntArray[i].classList);
    		//targetButton = 
    		if(elemntArray[i].classList.contains("gridButtonClicked")){
    			elemntArray[i].classList.remove("gridButtonClicked");
    		}
    	}
    	this.props.dispatch(resetGridArray());
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
			//console.log("grid data", this.props.gridData.gridArray);
			if(this.props.gridData.columns > 0 && this.props.gridData.rows > 0){
				console.log("construct table");
				tableData = rowData.map(row=>{
					return(
						<tr key={row.id}>
							{columnData.map(column => {
								return(
									<td 
									key={row.id + column.id}><button id={"row" + row.id.toString() + " " + "column" + column.id.toString()} className="gridButton" data-row={row.id} data-column={column.id}
									onMouseDown={(e)=>{this.gridButtonClicked(e); this.gridButtonMouseDown(e);}}
									onMouseUp={(e) => this.gridbuttonMouseUp(e)}
									onMouseOver = {(e) => this.gridButtonMouseOver(e)}
									></button>
									</td>
								);
							})}
						</tr>
					);
				});
				//this.resetButtons();
				resetButton = <button className="resetButton" onClick={e=>this.resetButtons(e)}>Reset</button>
				this.renderGrid();
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