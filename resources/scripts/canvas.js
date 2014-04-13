var IMG_DIR = "resources/images/";
var a = null;
var b = null;

function Canvas() {
	this.resetBoard();
	this.listenClicks();
	this.resetTotalPoints();
	this.resetLevelPoints();
};

Canvas.prototype.listenClicks = function() {
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			var cell = $("#boardTable tr:eq(" + i + ") td:eq(" + j + ")");
			cell.click(function(){
				var x = $(this).parent().parent().children().index($(this).parent());
				var y = $(this).parent().children().index($(this));
				swapJewels(x, y);
			});
		}
	}
};

Canvas.prototype.resetBoard = function() {
	var boardDiv = $("#board");
	var table = "<table id=\"boardTable\">";
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
};

Canvas.prototype.resetLevelPoints = function() {
};

Canvas.prototype.drawBoard = function(grid) {
	var boardDiv = $("#board");
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			var img = image(IMG_DIR + grid[i][j].type.icon);
			$("#boardTable tr:eq(" + i + ") td:eq(" + j + ")").html(img);
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
	var img = image(IMG_DIR + jewel.type.icon);
	$("#boardTable tr:eq(" + jewel.x + ") td:eq(" + jewel.y + ")").hide().html(img).fadeIn();
};

Canvas.prototype.blank = function(jewel) {
	$("#boardTable tr:eq(" + jewel.x + ") td:eq(" + jewel.y + ")").hide().html("lol").fadeIn();
}

function image(img_path) {
	return "<img src=\"" + img_path + "\" />";
}

function swapJewels(x, y) {
	console.log(x + " " + y);
	if (a == null) {
		a = board.grid[x][y];
	} else if (a != null && b == null) {
		b = board.grid[x][y];
		board.swapJewels(a, b);
		a = null;
		b = null;
	}
}
