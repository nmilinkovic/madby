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
	
	var posX = this.ox + dx;
	var posY = this.oy + dy;
	
	this.attr({x: posX - posX % GRID_SIZE});
	this.attr({y: posY - posY % GRID_SIZE});
};

var endTable = function () {
	
};

function elementContainsPoint(element, pointX, pointY, elementWidth, elementHeight){
	return pointX >= element.attr("x")
		   && pointX <= element.attr("x") + elementWidth
     	   && pointY >= element.attr("y")
		   && pointY <= element.attr("y") + elementHeight;
}

