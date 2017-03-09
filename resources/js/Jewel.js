import * as JewelType from "./JewelType";

export default class Jewel
{
    /**
     * @param x
     * @param y
     * @param {JewelType} type
     */
    constructor(x, y, type = JewelType.JewelType.UNDEFINED)
    {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    /**
     *
     *
     * @param other
     * @returns {boolean}
     */
    adjacentTo(other)
    {
        return (this.x === other.x && this.y === other.y + 1) ||
            (this.x === other.x && this.y === other.y - 1) ||
            (this.y === other.y && this.x === other.x + 1) ||
            (this.y === other.y && this.x === other.x - 1);
    }

    /**
     * @returns {string}
     */
    toString()
    {
        return this.type.code + ":(" + this.x + "," + this.y + ")";
    }
}