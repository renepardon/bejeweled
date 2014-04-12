function Canvas() {
	this.resetBoard();
	this.resetTotalPoints();
	this.resetLevelPoints();
};

Canvas.prototype.resetBoard = function() {
	var boardDiv = $("#board");
	var table = "<table id=\"boardTable\" border=\"1\">";
	for (var i = 0; i < SIZE; i++) {
		table += "<tr>\n";
		for (var j = 0; j < SIZE; j++) {
			table += "<td></td>\n";
		}
		table += "</tr>\n";
	}
	table += "</table>";
	boardDiv.append(table);
};

Canvas.prototype.resetTotalPoints = function() {
	console.log("total points = 0");
};

Canvas.prototype.resetLevelPoints = function() {
	console.log("level points = 0");
};

Canvas.prototype.drawBoard = function(board) {
	var boardDiv = $("#board");
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			$("#boardTable tr:eq(" + i + ") td:eq(" + j + ")").html(board[i][j].type.code);
		}
	}
};

Canvas.prototype.drawTotalPoints = function(points) {
	$("#totalPoints").html(points);
}

Canvas.prototype.drawLevelPoints = function(points) {
	$("#levelPoints").html(points);
}

Canvas.prototype.drawJewel = function(jewel) {
	var x = jewel.x;
	var y = jewel.y;
	$("#boardTable tr:eq(" + x + ") td:eq(" + y + ")").html(jewel.type.code);
};