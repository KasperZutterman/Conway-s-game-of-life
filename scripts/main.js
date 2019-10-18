import BoardManager from './model/BoardManager.js';
//import Board from './model/Board.js';
import BoardView from './view/BoardView.js';

let gridLines = false;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let gridbox = document.getElementById("gridCheckbox");
gridbox.addEventListener('change', (e) => {
    gridLines = !gridLines;
        if (gridLines) boardManager.drawGrid();
        else boardManager.drawOldBoard();
});

let btnStep = document.getElementById("btnStep");
btnStep.addEventListener('click', (e) => {
    boardManager.nextGeneration();
});

let btnPlay = document.getElementById("btnPlay");
var interval = false;
btnPlay.addEventListener('click', (e) => {
    if (interval) {
        clearInterval(interval);
        interval = false;
    } else {
        interval = setInterval(() => {boardManager.nextGeneration();}, 500);
    }
});

let view = new BoardView(canvas);

let boardManager = new BoardManager(60, 40, 10, 10, view);
boardManager.drawOldBoard();

document.addEventListener('keydown', (e) => {
    //console.log(e.code);
    if (e.code === "ArrowRight") {
        gridLines = !gridLines;
        if (gridLines) boardManager.drawGrid();
        else boardManager.drawOldBoard();
    }
    else if (e.code === "Enter") {
        boardManager.nextGeneration();
        if (gridLines) boardManager.drawGrid();
    }
});