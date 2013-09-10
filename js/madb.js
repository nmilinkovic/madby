window.onload = function() {
	
	var canvasDiv = document.getElementById('canvas');
	var canvas = Raphael(canvasDiv);
	
	drawGrid(canvas, canvasDiv, GRID_SIZE, GRID_LINE_COLOR);
	
	var elementsArray = new Array();
	
	var line;
	var pathStartX;
	var pathStartY;
	var isStarted = false;
	var startElementId = null;
	
	canvasDiv.oncontextmenu = function(e){
		e.preventDefault();
		stateConnectionDraw = !stateConnectionDraw;
		var len = elementsArray.length;
		pathStartX = e.clientX - e.clientX % GRID_SIZE;
		pathStartY = e.clientY - e.clientY % GRID_SIZE;
		
		if(stateConnectionDraw){
			for(var i = 0; i < len; i++){
				isStarted = elementContainsPoint(elementsArray[i], pathStartX, pathStartY, TABLE_WIDTH, TABLE_HEIGHT);
				if(isStarted){
					startElementId = elementsArray[i].id;
					line = canvas.path("M" + pathStartX + " " + pathStartY + " L" + pathStartX + " " + pathStartY).attr({stroke: LINK_STROKE});
					break;
				}
			}
		} else {
			
			var isEnded = false;
			
			for(var i = 0; i < len; i++){
				isEnded = elementContainsPoint(elementsArray[i], pathStartX, pathStartY, TABLE_WIDTH, TABLE_HEIGHT);
				if(isEnded){
					break;
				}
			}
			
			if(isEnded && startElementId != elementsArray[i].id){
				line = null;
			} else {
				line.remove();
			}
			
			startElementId = null;
			isStarted = false;
		}
	};
	
	canvasDiv.onmousemove = function(e){
		if(stateConnectionDraw && isStarted){
			var pathEndX = e.clientX - e.clientX % GRID_SIZE;
			var pathEndY = e.clientY - e.clientY % GRID_SIZE;
			 
			line.attr({path: "M" + pathStartX + " " + pathStartY + " L" + pathEndX + " " + pathEndY});
		};
	};
		
	canvasDiv.ondblclick = function(e){
		var event = e || window.event;

		var posX = event.clientX - canvasDiv.offsetLeft - TABLE_WIDTH / 2;
		var posY = event.clientY - canvasDiv.offsetTop - TABLE_HEIGHT / 2;
		
		posX = posX - posX % GRID_SIZE;
		posY = posY - posY % GRID_SIZE;
		
		var rect = canvas.rect(posX, posY, TABLE_WIDTH, TABLE_HEIGHT).attr({fill: TABLE_COLOR, stroke: TABLE_STROKE, opacity: TABLE_OPACITY});
		
		canvas.set(rect).drag(moveTable, startTable, endTable);
		
		elementsArray.push(rect);
	};

};

