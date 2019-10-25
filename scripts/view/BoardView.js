//import Board from '../model/Board.js';

export default class BoardView {
        
        constructor(canvas) {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
        }
        
        draw(board) {
            for (let y = 0; y < board.height; y++) {
                for (let x = 0; x < board.width; x++) {
                    this.drawCell(board.grid[y][x], board.cellWidth, board.cellHeight);
                }
            }
        }
        
        drawCell(cell, width, height) {
            this.context.fillStyle = cell.color;
            this.context.fillRect(cell.x * width, cell.y * height, width, height);
        }
        
        drawGrid(board) {
            this.context.fillStyle = "#000000";
            for (let y = 0; y < board.height; y++) {
                this.context.beginPath();
                this.context.moveTo(0, y * board.cellHeight);
                this.context.lineTo(board.cellWidth * board.width, y * board.cellHeight);
                this.context.stroke();
            }
            for (let x = 0; x < board.width; x++) {
                this.context.beginPath();
                this.context.moveTo(x * board.cellWidth, 0);
                this.context.lineTo(x * board.cellWidth, board.cellHeight * board.height);
                this.context.stroke();
            }
        }
}