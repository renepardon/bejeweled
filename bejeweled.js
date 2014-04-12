/* JEWEL TYPES */
var JewelType = {
	RED			: { name: "Red",		color: "ff0000",	code: 'R' },
	GREEN		: { name: "Green",		color: "00ff00",	code: 'G' },
	BLUE		: { name: "Blue",		color: "0000ff",	code: 'B' },
	YELLOW		: { name: "Yellow",		color: "ffff00",	code: 'Y' },
	UNDEFINED	: { name: "Undefined",	color: "000000",	code: '?' }
};

/* BOARD */
function Board() {
	this.LINES = 10;
	this.COLUMNS = 10;
};

Board.prototype.newGame = function() {
	this.emptyBoard();
	console.log(this.toString());
};

Board.prototype.emptyBoard = function() {
	this.board = new Array(this.LINES);
	for (var i = 0; i < this.LINES; i++) {
		this.board[i] = new Array(this.COLUMNS);
		for (var j = 0; j < this.COLUMNS; j++) {
			var r = Math.floor(Math.random() * 10) % 4;
			switch (r) {
				case 0:
					this.board[i][j] = new Jewel(i, j, JewelType.RED);
					break;
				case 1:
					this.board[i][j] = new Jewel(i, j, JewelType.GREEN);
					break;
				case 2:
					this.board[i][j] = new Jewel(i, j, JewelType.BLUE);
					break;
				case 3:
					this.board[i][j] = new Jewel(i, j, JewelType.YELLOW);
					break;
				default:
					break;
			}
		}
	}
};

Board.prototype.toString = function() {
	var result = "";
	for (var k = 0; k < this.COLUMNS + 2; k++) {
		result += "-";
	}
	result += "\n";
	for (var i = 0; i < this.LINES; i++) {
		result += "|";
		for (var j = 0; j < this.COLUMNS; j++) {
			result += this.board[i][j].type.code;
		}
		result += "|\n";
	}
	for (k = 0; k < this.COLUMNS + 2; k++) {
		result += "-";
	}
	return result;
};

/* JEWEL */
function Jewel(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type;
};

Jewel.prototype.getType = function() {
	return this.type;
};
	
Jewel.prototype.getX = function() {
	return this.x;
};
	
Jewel.prototype.getY = function() {
	return this.y;
};

Jewel.prototype.getNeighbors = function() {
	// TODO
	console.log("getting neighbors");
};

Jewel.prototype.toString = function() {
	return this.type.name + " jewel at (" + this.x + "," + this.y + ")";
};

/* RUN */
var board = new Board();
board.newGame();
