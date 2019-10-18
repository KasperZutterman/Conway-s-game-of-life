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

//setInterval(console.log(1), 1000);
//let board = new Board(120,80);
//console.log(board);

let view = new BoardView(canvas);

let boardManager = new BoardManager(60, 40, 10, 10, view);
boardManager.drawOldBoard();
//view.draw();

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