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

//let canvas = document.getElementById("canvas");
//let context = canvas.getContext("2d");

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

let btnStep = document.getElementById("btnStep");
btnStep.addEventListener('click', (e) => {
    boardManager.nextGeneration();
});

let playInterval = 50;
let speedSlider = document.getElementById("speedSlider");
speedSlider.oninput = function() {
    playInterval = this.value;
    clearInterval(interval);
    interval = false;
    interval = setInterval(() => {boardManager.nextGeneration();}, playInterval);
};

let btnPlay = document.getElementById("btnPlay");
var interval = false;
btnPlay.addEventListener('click', (e) => {
    if (interval) {
        clearInterval(interval);
        interval = false;
    } else {
        interval = setInterval(() => {boardManager.nextGeneration();}, playInterval);
    }
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

var mousedown = false;
canvasBoard.addEventListener("mousedown", (e) => {
    mousedown = true;
    drawCell(e);
});

canvasBoard.addEventListener("mousemove", (e) => {
    if (mousedown) {
        drawCell(e);
    }
});

canvasBoard.addEventListener("mouseup", () => {
    mousedown = false;
});

window.oncontextmenu = function(event) {
    var source = event.target.id || event.srcElement.id;
    if(source === 'canvasBoard') {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
};

function drawCell(event) {
    const rect = canvasBoard.getBoundingClientRect();
    let x = Math.floor((event.clientX - rect.left) / cellWidth);
    let y = Math.floor((event.clientY - rect.top) / cellHeight);
    if(x <= 0) x = 0;
    else if(x >= width) x = width - 1;
    if(y <= 0) y = 0;
    else if(y >= height) y = height - 1;
    //console.log("x: " + x + " y: " + y);
    if (event.which === 1) { //Left mouse button
        //console.log("LEFT");
        boardManager.setCell(x, y, true);
    }
    else if (event.which === 3) { //Right mouse button
        //console.log("Right");
        boardManager.setCell(x, y, false);
    }
    boardManager.drawOldBoard();
  
}