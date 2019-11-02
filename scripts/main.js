import BoardManager from './model/BoardManager.js';
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

let populationAlive = document.getElementById("populationAlive");
let populationDead = document.getElementById("populationDead");
let generation = document.getElementById("generation");

let gridbox = document.getElementById("gridCheckbox");
gridbox.addEventListener('change', (e) => {
    gridLines = !gridLines;
        if (gridLines) boardManager.drawGrid();
        else boardManager.drawOldBoard();
});

let btnStep = document.getElementById("btnStep");
btnStep.addEventListener('click', (e) => {
    drawGeneration();
});

let btnClear = document.getElementById("btnClear");
btnClear.addEventListener('click', (e) => {
    initCanvas();
});

let btnImport = document.getElementById("importJSON");
let input = document.createElement('input');
input.type = 'file';
input.onchange = e => {
    let file = e.target.files[0];

    // setting up the reader
   var reader = new FileReader();
   reader.readAsText(file);
   
   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      initCanvas();
      boardManager.setActiveBoard(JSON.parse(reader.result));
      boardManager.drawOldBoard();
      input.value = '';
   };  
};

btnImport.addEventListener('click', (e) => {
    input.click();
});

let btnExport = document.getElementById("exportJSON");
btnExport.addEventListener('click', (e) => {
    exportToJsonFile(boardManager.getActiveBoard());
});

let playInterval = 50;
let speedSlider = document.getElementById("speedSlider");
speedSlider.oninput = function() {
    playInterval = this.value;
    clearInterval(interval);
    interval = false;
    interval = setInterval(() => {drawGeneration();}, playInterval);
};

let btnPlay = document.getElementById("btnPlay");
var interval = false;
btnPlay.addEventListener('click', (e) => {
    if (interval) {
        clearInterval(interval);
        interval = false;
        btnPlay.textContent = "Play";
    } else {
        btnPlay.textContent = "Pause";
        interval = setInterval(() => {drawGeneration();}, playInterval);
    }
});

let boardDAO = new BoardDAO(width, height, cellWidth, cellHeight);

let boardView = new BoardView(canvasBoard);
let dataView = new DataView(canvasHeatMap, boardDAO);

let boardManager = new BoardManager(width, height, cellWidth, cellHeight, boardView);
initCanvas();

document.addEventListener('keydown', (e) => {
    //console.log(e.code);
    if (e.code === "ArrowRight") {
        gridLines = !gridLines;
        if (gridLines) boardManager.drawGrid();
        else boardManager.drawOldBoard();
    }
    else if (e.code === "Enter") {
       drawGeneration();
    }
});

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
    if (event.which === 1) { //Left mouse button
        boardManager.setCell(x, y, true);
    }
    else if (event.which === 3) { //Right mouse button
        boardManager.setCell(x, y, false);
    }
    boardManager.drawOldBoard();
}

function drawGeneration() {
    boardManager.nextGeneration();
    boardDAO.addData(boardManager.getGrid());
    dataView.draw();
    if (gridLines) boardManager.drawGrid();
    updateStatisticsText();
}

function initCanvas() {
    boardManager.init();
    boardDAO = new BoardDAO(width, height, cellWidth, cellHeight);
    boardDAO.addData(boardManager.getGrid());
    dataView = new DataView(canvasHeatMap, boardDAO);
    dataView.draw();
    boardManager.drawOldBoard();
    updateStatisticsText();
}

function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}