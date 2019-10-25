import BoardManager from './model/BoardManager.js';
//import Board from './model/Board.js';
import BoardView from './view/BoardView.js';
import DataView from './view/DataView.js';
import BoardDAO from './model/BoardDAO.js';

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

//setInterval(console.log(1), 1000);
//let board = new Board(120,80);
//console.log(board);
let boardDAO = new BoardDAO(60, 40, 10, 10);

let boardView = new BoardView(canvasBoard);
let dataView = new DataView(canvasHeatMap, boardDAO);

let boardManager = new BoardManager(60, 40, 10, 10, boardView);
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
        boardDAO.addData(boardManager.getGrid());
        dataView.draw();
        if (gridLines) boardManager.drawGrid();
        updateStatisticsText();
    }
});

let populationAlive = document.getElementById("populationAlive");
let populationDead = document.getElementById("populationDead");
let generation = document.getElementById("generation");

function updateStatisticsText() {
    populationAlive.textContent=boardDAO.getPopulationAlive();
    populationDead.textContent=boardDAO.getPopulationDead();
    generation.textContent=boardDAO.getGeneration();
}