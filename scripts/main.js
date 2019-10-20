import BoardManager from './model/BoardManager.js';
//import Board from './model/Board.js';
import BoardView from './view/BoardView.js';
import DataView from './view/DataView.js';
import BoardDAO from './model/BoardDAO.js';

let width = 60;
let height = 40;
let cellWidth = 10;
let cellHeight = 10;

let gridLines = false;

let canvasBoard = document.getElementById("canvasBoard");
let context = canvasBoard.getContext("2d");

let canvasHeatMap = document.getElementById("canvasHeatMap");
let contextHeatMap = canvasHeatMap.getContext("2d");

let gridbox = document.getElementById("gridCheckbox");
gridbox.addEventListener('change', (e) => {
    gridLines = !gridLines;
        if (gridLines) boardManager.drawGrid();
        else boardManager.drawOldBoard();
});

let boardDAO = new BoardDAO(width, height, cellWidth, cellHeight);

let boardView = new BoardView(canvasBoard);
let dataView = new DataView(canvasHeatMap, boardDAO);

let boardManager = new BoardManager(width, height, cellWidth, cellHeight, boardView);
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
        boardDAO.addData(boardManager.getGrid());
        dataView.draw();
        if (gridLines) boardManager.drawGrid();
    }
});

canvasBoard.addEventListener("mousedown", (e) => {
    const rect = canvasBoard.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellWidth);
    const y = Math.floor((event.clientY - rect.top) / cellHeight);
    //console.log("x: " + x + " y: " + y);
    if (e.which === 1) { //Left mouse button
        console.log("LEFT");
    }
    else if (e.which === 3) { //Right mouse button
        console.log("Right");
        
    }
});

window.oncontextmenu = function(event) {
    var source = event.target.id || event.srcElement.id;
    if(source === 'canvasBoard') {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
};