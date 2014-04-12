/* JEWEL TYPES */
var JewelType = {
	BLUE		: { name: "Blue",		code: 'B',	icon: 'blue.gif' },
	GREEN		: { name: "Green",		code: 'G',	icon: 'green.gif' },
	HYPERCUBE	: { name: "Hypercube",	code: 'H',	icon: 'hypercube.gif' },
	ORANGE		: { name: "Orange",		code: 'O',	icon: 'orange.gif' },
	PINK		: { name: "Pink",		code: 'P',	icon: 'pink.gif' },
	RED			: { name: "Red",		code: 'R',	icon: 'red.gif' },
	WHITE		: { name: "White",		code: 'W',	icon: 'white.gif' },
	YELLOW		: { name: "Yellow",		code: 'Y',	icon: 'yellow.gif' },
	UNDEFINED	: { name: "Undefined",	code: '?',	icon: null }
};

/* BOARD */
SIZE = 8;

function Board() {
	this.canvas = new Canvas();
	this.totalPoints = 0;
};

Board.prototype.newGame = function() {
	this.newBoard();
	this.levelPoints = 0;
	this.canvas.drawBoard(this.grid);
	this.canvas.drawTotalPoints(this.totalPoints);
	this.canvas.drawLevelPoints(this.levelPoints);
};

Board.prototype.newBoard = function() {
	this.grid = new Array(SIZE);
	for (var i = 0; i < SIZE; i++) {
		this.grid[i] = new Array(SIZE);
		for (var j = 0; j < SIZE; j++) {
			var r = Math.floor(Math.random() * 10) % 7;
			switch (r) {
				case 0:
					this.grid[i][j] = new Jewel(i, j, JewelType.BLUE);
					break;
				case 1:
					this.grid[i][j] = new Jewel(i, j, JewelType.GREEN);
					break;
				case 2:
					this.grid[i][j] = new Jewel(i, j, JewelType.ORANGE);
					break;
				case 3:
					this.grid[i][j] = new Jewel(i, j, JewelType.PINK);
					break;
				case 4:
					this.grid[i][j] = new Jewel(i, j, JewelType.RED);
					break;
				case 5:
					this.grid[i][j] = new Jewel(i, j, JewelType.WHITE);
					break;
				case 6:
					this.grid[i][j] = new Jewel(i, j, JewelType.YELLOW);
					break;
				default:
					break;
			}
		}
	}
};

Board.prototype.swapJewels = function(a, b) {
	if (!a.adjacentTo(b)) {
		console.log(a.toString() + " not adjacent to " + b.toString());
		return;
	}
	var tempX = a.x;
	var tempY = a.y;
	this.moveJewel(a, b.x, b.y);
	this.moveJewel(b, tempX, tempY);
};

Board.prototype.moveJewel = function(jewel, x, y) {
	jewel.x = x;
	jewel.y = y;
	this.grid[x][y] = jewel;
	this.canvas.drawJewel(jewel);
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
			result += this.grid[i][j].type.code;
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

Jewel.prototype.adjacentTo = function(other) {
	return (this.x == other.x && this.y == other.y + 1) ||
		   (this.x == other.x && this.y == other.y - 1) ||
		   (this.y == other.y && this.x == other.x + 1) ||
		   (this.y == other.y && this.x == other.x - 1);
};

Jewel.prototype.toString = function() {
	return this.type.name + " jewel at (" + this.x + "," + this.y + ")";
};
