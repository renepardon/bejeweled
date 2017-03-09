import $ from "jquery"
import Bejeweled from "./Bejeweled";
import Canvas from "./Canvas";

let bejeweled;

$(function() {
    "use strict";

    let canvas = new Canvas();
    bejeweled = new Bejeweled(canvas);
    bejeweled.startGame();
});