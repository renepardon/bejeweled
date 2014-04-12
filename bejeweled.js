/* JEWEL TYPES */
var JewelType = {
	RED			: { name: "Red",		color: "ff0000",	code: 'R' },
	GREEN		: { name: "Green",		color: "00ff00",	code: 'G' },
	BLUE		: { name: "Blue",		color: "0000ff",	code: 'B' },
	YELLOW		: { name: "Yellow",		color: "ffff00",	code: 'Y' },
	UNDEFINED	: { name: "Undefined",	color: "000000",	code: '?' }
};

/* BOARD */
SIZE = 10;

function Board() {
	this.canvas = new Canvas();
	this.totalPoints = 0;
};

Board.prototype.newGame = function() {
	this.newBoard();
	this.levelPoints = 0;
	this.canvas.drawBoard(this.board);
	this.canvas.drawTotalPoints(this.totalPoints);
	this.canvas.drawLevelPoints(this.levelPoints);
};

Board.prototype.newBoard = function() {
	this.board = new Array(SIZE);
	for (var i = 0; i < SIZE; i++) {
		this.board[i] = new Array(SIZE);
		for (var j = 0; j < SIZE; j++) {
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
	for (var k = 0; k < SIZE + 2; k++) {
		result += "-";
	}
	result += "\n";
	for (var i = 0; i < SIZE; i++) {
		result += "|";
		for (var j = 0; j < SIZE; j++) {
			result += this.board[i][j].type.code;
		}
		result += "|\n";
	}
	for (k = 0; k < SIZE + 2; k++) {
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

Jewel.prototype.getNeighbors = function() {
	// TODO
	this.canvas.drawInfo("getting neighbors");
};

Jewel.prototype.toString = function() {
	return this.type.name + " jewel at (" + this.x + "," + this.y + ")";
};

/* RUN */
var board = new Board();
board.newGame();
