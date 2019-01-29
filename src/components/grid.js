import React from 'react';
import {connect} from 'react-redux';
import {updateGridArray,resetGridArray,updateColor} from '../actions/createGrid';
import "./grid.css";

export class Grid extends React.Component{
	constructor(props){
		super(props);
		this.gridButtonClickState = false;
        this.currentColour = "#000000";
	}

    setRowData(numCol){
    	let returnArray = [];
    	for(let i = 0; i < numCol;i++){
    		returnArray.push({id:i});
    	}
    	return returnArray;
    }

    setColumnData(numRow){
    	let returnArray = [];
    	for(let i = 0; i < numRow;i++){

    		returnArray.push({id:i} );
    	}
    	return returnArray;
    }

    renderGrid(){
        console.log("Grid Object Array Render: ", this.props.gridData.gridObjectArray);
        try{


            for(let i =0;i < this.props.gridData.gridObjectArray.length; i++){
                for(let column in this.props.gridData.gridObjectArray[i]){
                    let gridId = "row" + i + " " + column;
                    let targetButton = document.getElementById(gridId);

                    if(this.props.gridData.gridObjectArray[i][column].state === 1){
                        targetButton.classList.add("gridButtonClicked");
                        //use this to change the color of the element to the choosen color
                        console.log(this.props.gridData.gridObjectArray[i][column].state);
                        targetButton.style.backgroundColor = this.props.gridData.gridObjectArray[i][column].color;
                    }
                    else if(this.props.gridData.gridObjectArray[i][column].state === 0){
                        console.log(this.props.gridData.gridObjectArray[i][column].state);
                        targetButton.style.backgroundColor = "#ffffff";
                    }
                    console.log("test");
                }
            }
        }
        catch(err){
            
        }

    }
    gridButtonMouseOver(event){
    	event.preventDefault();
    	console.log("the mouse is over: ",event.target.id.split(" "));
    	console.log("mouse over row: ", event.target.dataset.row);
    	console.log("mouse over column: ", event.target.dataset.column);
    	const row = event.target.dataset.row;
    	const column = event.target.dataset.column;
    	//is it possible to do another check so we can get a mass remove class? might not be good eraser tool better?
    	if(this.gridButtonClickState === true){
    		this.props.dispatch(updateGridArray(row,column));
            this.props.dispatch(updateColor(this.currentColour,row,column));
    	}
    }
    //need another event listener to see if the mouse is off grid and change to false possible need a mouse out event?
    outOfGrid(event){
    	event.preventDefault();
    	this.gridButtonClickState = false;
    	try{
    		console.log(event.relatedTarget.classList[0]);
    	}
    	catch(err){

    	}
    	
    	console.log("out of grid: ",this.gridButtonClickState);
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
    	//will need to update array now as well to regain click remove class functionality
    	if(!targetButton.classList.contains("gridButtonClicked")){
    		targetButton.classList.add("gridButtonClicked");
    	}
    	else{
    		targetButton.classList.remove("gridButtonClicked");
    	}
    	this.props.dispatch(updateGridArray(row,column));
        this.props.dispatch(updateColor(this.currentColour,row,column));
    }

    changeColor(event){
        console.log("color: ", event.target.value);
        this.currentColour = event.target.value;
        //const row = event.target.dataset.row;
        //const column = event.target.dataset.column;
        //console.log(row,column)
        
    }

    resetButtons(){
    	let elementArray = document.getElementsByClassName("gridButton");
    	for(let i = 0;i<elementArray.length;i++){
    		//console.log("Reset button id: ",elementArray[i].id);
    		//console.log("Reset button id: ",elementArray[i].classList);
    		//targetButton = 
    		if(elementArray[i].classList.contains("gridButtonClicked")){
    			elementArray[i].classList.remove("gridButtonClicked");
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
        let colorInput;
        if(this.props.gridData.gridObjectArray){
           colorInput = (<input type="color" onChange={(e)=>this.changeColor(e)}/>)
        }
        console.log(this.props.gridData.gridObjectArray);
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
                {colorInput}
				<table className="gridTable"><tbody onMouseLeave={(e) => this.outOfGrid(e)}>{tableData}</tbody></table>
				{resetButton}
			</div>
		);
	}
}

const mapStateToProps = state => ({
    gridData: state.grid
});

export default connect(mapStateToProps)(Grid);