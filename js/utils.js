function drawGrid(canvas, canvasContainer, gridSize, gridLineColor){
	var canvasWidth = canvasContainer.offsetWidth;
	var canvasHeight = canvasContainer.offsetHeight;

	for(var i = gridSize; i <= canvasWidth; i = i + gridSize){
		canvas.path("M" + i + " 0" + " L" + i + " " + canvasHeight).attr({stroke: gridLineColor});
	}
	
	for(var i = gridSize; i <= canvasHeight; i = i + gridSize){
		canvas.path("M" + "0 " + i + " L" + canvasWidth + " " + i).attr({stroke: gridLineColor});
	}
}


var startTable = function () {
    this.ox = this.attr("x");
    this.oy = this.attr("y");
};

var moveTable = function (dx, dy) {
	
	var posX = this.ox + dx >= 0 ? this.ox + dx : 0;
	var posY = this.oy + dy >= 0 ? this.oy + dy : 0;
	
	var canvasDiv = document.getElementById('canvas');
	
	this.attr({x: posX - posX % GRID_SIZE});
	this.attr({y: posY - posY % GRID_SIZE});
	
	moveButtonDelete(posX, posY, this, canvasDiv);
	moveButtonNewColumn(posX, posY, this, canvasDiv);
};

function moveButtonDelete(tableStartX, tableStartY, raphaelShape, canvasElement){
	$("#buttonDelete" + raphaelShape.id).css({
		left: tableStartX - tableStartX % GRID_SIZE + TABLE_WIDTH * 5 / 6,
		top: tableStartY - tableStartY % GRID_SIZE + canvasElement.offsetTop
	});
};

function moveButtonNewColumn(tableStartX, tableStartY, raphaelShape, canvasElement){
	$("#buttonNewColumn" + raphaelShape.id).css({
		left: tableStartX - tableStartX % GRID_SIZE + TABLE_WIDTH * 5 / 6,
		top: tableStartY - tableStartY % GRID_SIZE + canvasElement.offsetTop + TABLE_HEIGHT * 5 / 6
	});
};

var endTable = function () {
	
};

function elementContainsPoint(element, pointX, pointY, elementWidth, elementHeight){
	return pointX >= element.attr("x")
	   && pointX <= element.attr("x") + elementWidth
 	   && pointY >= element.attr("y")
	   && pointY <= element.attr("y") + elementHeight;
}

function addButtonDeleteToTable(tableStartX, tableStartY, raphaelShape, canvasElement){
	var buttonDeleteId = "buttonDelete" + raphaelShape.id;
	var buttonDelete = "<input id=\'" + buttonDeleteId + "\' class=\'buttonDelete\' type=\'button\' value=\'X\' />";
	
	$("#canvas").append(buttonDelete);
	
	buttonDelete = $("#" + buttonDeleteId);
	
	buttonDelete.css({
		left: tableStartX + TABLE_WIDTH * 5 / 6,
		top: tableStartY + canvasElement.offsetTop
	});
	
	buttonDelete.click(function() {
		$("#buttonNewColumn" + raphaelShape.id).remove();
		this.remove();
		raphaelShape.remove();
	});
};

function addButtonNewColumnToTable(tableStartX, tableStartY, raphaelShape, canvasElement){
	var buttonNewColumnId = "buttonNewColumn" + raphaelShape.id;
	var buttonNewColumn = "<input id=\'" + buttonNewColumnId + "\' class=\'buttonNewColumn\' type=\'button\' value=\'+\' />";
	
	$("#canvas").append(buttonNewColumn);
	$("#" + buttonNewColumnId).css({
		left: tableStartX + TABLE_WIDTH * 5 / 6,
		top: tableStartY + TABLE_HEIGHT * 5 / 6 + canvasElement.offsetTop
	});
};

