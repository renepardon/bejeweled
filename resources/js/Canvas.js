import $ from "jquery"

const IMG_DIR = "resources/images/";
const SIZE = 8;

export default class Canvas {
    constructor()
    {
        this.resetBoard();
        this.listenClicks();
        this.resetScore();
        // variables to store jewels to be swapped
        this.a = null;
        this.b = null;
    }

    image(imgPath)
    {
        return `<img src="${IMG_DIR}${imgPath}" alt="img" />`;
    }

    listenClicks()
    {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let cell = this.getCell(i, j);

                cell.click((event) => {
                    this.clickCallback(event)
                });
            }
        }
    }

    clickCallback(event)
    {
        let x = $(event.currentTarget).parent().parent().children().index($(event.currentTarget).parent());
        let y = $(event.currentTarget).parent().children().index($(event.currentTarget));

        this.swapJewels(x, y);
    }

    resetBoard()
    {
        let boardDiv = $("#content");
        let table = "<table id=\"board-table\">";
        for (let i = 0; i < SIZE; i++) {
            table += "<tr>\n";
            for (let j = 0; j < SIZE; j++) {
                table += "<td></td>\n";
            }
            table += "</tr>\n";
        }
        table += "</table>";
        boardDiv.append(table);
    }

    resetScore()
    {
        let boardDiv = $("#content");
        let score = "<div id=\"level-complete\"></div>";
        score += "<table id=\"score_table\">";
        // level
        score += "<tr>\n";
        score += "<td align=\"left\">Level:</td>\n";
        score += "<td align=\"right\" id=\"level\">0</td>\n";
        score += "</tr>\n";
        // total points
        score += "<tr>\n";
        score += "<td align=\"left\">Total points:</td>\n";
        score += "<td align=\"right\" id=\"total_points\">0</td>\n";
        score += "</tr>\n";
        score += "</table>";
        boardDiv.prepend(score);
    }

    drawBoard(grid)
    {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let img = this.image(grid[i][j].type.icon);
                this.getCell(i, j).html(img);
            }
        }
    }

    drawLevel(level)
    {
        $("#level").html(level);
    }

    drawTotalPoints(totalPoints)
    {
        $("#total_points").html(totalPoints);
    }

    levelComplete(level)
    {
        let levelCompleteDiv = $("#level-complete");
        levelCompleteDiv.html("LEVEL " + level + " COMPLETED");

        $("#board-table").fadeOut(2000, () =>
        {
            $("#board-table").fadeIn();

            levelCompleteDiv.fadeOut(2000, () =>
            {
                levelCompleteDiv.html("").fadeIn();
            });
        });
    }

    drawJewel(jewel)
    {
        let img = this.image(jewel.type.icon);
        let cell = this.getCell(jewel.x, jewel.y);

        cell.html("").html(img).fadeIn(500);
    }

    highlightExplosion(toExplode)
    {
        for (let i = 0; i < toExplode.length; i++) {
            let jewel = toExplode[i];
            let cell = this.getCell(jewel.x, jewel.y);

            cell.fadeIn(500);
        }
    }

    getCell(x, y)
    {
        return $("#board-table tr:eq(" + x + ") td:eq(" + y + ")");
    }

    swapJewels(x, y)
    {
        if (this.a === null) {
            this.a = this.bejeweled.grid[x][y];
        } else if (this.a !== null && this.b === null) {
            this.b = this.bejeweled.grid[x][y];
            this.bejeweled.swapJewels(this.a, this.b);
            this.a = null;
            this.b = null;
        }
    }

    /**
     *
     *
     * @param {Bejeweled} bejeweled
     */
    setGame(bejeweled)
    {
        this.bejeweled = bejeweled
    }
}
