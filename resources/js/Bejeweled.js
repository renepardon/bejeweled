import Jewel from "./Jewel";
import * as JewelType from "./JewelType";

const SIZE = 8;

export default class Bejeweled
{
    /**
     * @param {Canvas} canvas
     */
    constructor(canvas)
    {
        this.canvas = canvas;
        this.level = 0;
        this.levelPoints = 0;
        this.totalPoints = 0;
        this.movePoints = 0;
        this.grid = null;
    }

    /**
     * Create anew gaming grid (board)
     */
    newBoard()
    {
        this.grid = new Array(SIZE);

        for (let i = 0; i < SIZE; i++) {
            this.grid[i] = new Array(SIZE);

            for (let j = 0; j < SIZE; j++) {
                this.grid[i][j] = this.newJewel(i, j);
            }
        }
    }

    /**
     * Start a new game and re-create the board
     */
    startGame()
    {
        this.newBoard();

        this.level++;
        this.levelPoints = 0;
        this.canvas.drawBoard(this.grid);
        this.canvas.drawLevel(this.level);
        this.canvas.setGame(this);
    }

    /**
     *
     *
     * @param a
     * @param b
     */
    swapJewels(a, b)
    {
        if (a.type === b.type || !a.adjacentTo(b)) {
            a = b = null;
            return;
        }

        this.switch(a, b);
        this.tryToExplode(a);
        this.tryToExplode(b);

        if (this.movePoints === 0) {
            this.switch(a, b);
        } else {
            this.updateScore(this.movePoints);
        }
    }

    /**
     *
     *
     * @param a
     * @param b
     */
    switch(a, b)
    {
        let tempX = a.x;
        let tempY = a.y;
        this.moveJewel(a, b.x, b.y);
        this.moveJewel(b, tempX, tempY);
    }

    /**
     *
     *
     * @param jewel
     * @param x
     * @param y
     */
    moveJewel(jewel, x, y)
    {
        jewel.x = x;
        jewel.y = y;
        this.grid[x][y] = jewel;
        this.canvas.drawJewel(jewel);
    }

    /**
     *
     *
     * @param movePoints
     */
    updateScore(movePoints)
    {
        this.levelPoints += movePoints;
        this.totalPoints += movePoints;
        this.canvas.drawTotalPoints(this.totalPoints);
        this.movePoints = 0;

        if (this.levelPoints >= SIZE * this.level) {
            this.canvas.levelComplete(this.level);
            this.startGame();
        }
    }

    /**
     *
     *
     * @param jewel
     */
    tryToExplode(jewel)
    {
        let toExplode = [];

        // grab the ones we can explode horizontally
        // left to the jewel
        for (let j = jewel.y - 1; j >= 0 && jewel.type === this.grid[jewel.x][j].type; j--) {
            toExplode.push(this.grid[jewel.x][j]);
        }

        // the jewel itself
        toExplode.push(jewel);
        // right to the jewel
        for (let j = jewel.y + 1; j < SIZE && jewel.type === this.grid[jewel.x][j].type; j++) {
            toExplode.push(this.grid[jewel.x][j]);
        }

        // if we have stuff to explode horizontally
        if (toExplode.length >= 3) {
            this.explode(toExplode);
            return;
        }

        toExplode = [];
        // grab the ones we can explode vertically
        // above the jewel
        for (let i = jewel.x - 1; i >= 0 && jewel.type === this.grid[i][jewel.y].type; i--) {
            toExplode.push(this.grid[i][jewel.y]);
        }

        // the jewel itself
        toExplode.push(jewel);
        // below the jewel
        for (let i = jewel.x + 1; i < SIZE && jewel.type === this.grid[i][jewel.y].type; i++) {
            toExplode.push(this.grid[i][jewel.y]);
        }

        // if we have stuff to explode vertically
        if (toExplode.length >= 3) {
            this.explode(toExplode);
            return;
        }
    }

    /**
     *
     *
     * @param toExplode
     */
    explode(toExplode)
    {
        this.canvas.highlightExplosion(toExplode);

        // at this point, we know that toExplode is ordered left-right or up-down
        if (toExplode[0].x == toExplode[1].x) {
            let x = toExplode[0].x;
            let minY = toExplode[0].y;

            for (let i = 1; i < toExplode.length; i++) {
                if (toExplode[i].y < minY) {
                    minY = toExplode[i].y;
                }
            }

            if (x !== 0) {
                // we are exploding horizontally
                for (let k = 0; k < toExplode.length; k++) {
                    for (let i = x - 1; i >= 0; i--) {
                        this.moveJewel(this.grid[i][minY + k], i + 1, minY + k);
                    }
                }
            }

            this.newRow(minY, toExplode.length);
        } else {
            let minX = toExplode[0].x;
            let y = toExplode[0].y;

            for (let i = 1; i < toExplode.length; i++) {
                if (toExplode[i].x < minX) {
                    minX = toExplode[i].x;
                }
            }

            // we are exploding vertically
            for (let i = minX - 1; i >= 0; i--) {
                this.moveJewel(this.grid[i][y], i + toExplode.length, y);
            }

            this.newColumn(y, toExplode.length);
        }

        this.movePoints += toExplode.length;
    }

    /**
     *
     *
     * @param minY
     * @param n
     */
    newRow(minY, n)
    {
        for (let k = 0; k < n; k++) {
            let jewel = this.newJewel(0, minY + k);

            this.grid[0][minY + k] = jewel;
            this.canvas.drawJewel(jewel);
        }
    }

    /**
     *
     *
     * @param y
     * @param n
     */
    newColumn(y, n)
    {
        for (let i = 0; i < n; i++) {
            let jewel = this.newJewel(i, y);
            this.grid[i][y] = jewel;
            this.canvas.drawJewel(jewel);
        }
    }

    /**
     * Create a new jewel
     *
     * @param x
     * @param y
     * @returns {Jewel}
     */
    newJewel(x, y)
    {
        let r = Math.floor(Math.random() * 10) % 7;

        switch (r) {
            case 0:
                return new Jewel(x, y, JewelType.JewelType.BLUE);
            case 1:
                return new Jewel(x, y, JewelType.JewelType.GREEN);
            case 2:
                return new Jewel(x, y, JewelType.JewelType.ORANGE);
            case 3:
                return new Jewel(x, y, JewelType.JewelType.PINK);
            case 4:
                return new Jewel(x, y, JewelType.JewelType.RED);
            case 5:
                return new Jewel(x, y, JewelType.JewelType.WHITE);
            case 6:
                return new Jewel(x, y, JewelType.JewelType.YELLOW);
            default:
                break;
        }
    }

    /**
     * @returns {string}
     */
    toString()
    {
        let result = "";

        for (let k = 0; k < SIZE + 2; k++) {
            result += "-";
        }

        result += "\n";

        for (let i = 0; i < SIZE; i++) {
            result += "|";

            for (let j = 0; j < SIZE; j++) {
                result += this.grid[i][j].type.code;
            }

            result += "|\n";
        }

        for (let k = 0; k < SIZE + 2; k++) {
            result += "-";
        }

        return result;
    }
}
