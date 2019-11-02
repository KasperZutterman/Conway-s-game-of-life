import Cell from './Cell.js';

export default class Board {
        
        constructor (width, height, cellWidth, cellHeight) {
            this.width = width;
            this.height = height;
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.grid;
            this.makeGrid(this.width, this.height);
            this.createCells(this.width, this.height);
        }
        
        makeGrid(xCell, yCell) {
            this.grid = [yCell];
            for (var y = 0; y < yCell; y++) {
                this.grid[y] = [xCell];
            }
        }
        
        createCells(xCell, yCell) {
            for (let y = 0; y < yCell; y++) {
                for (let x = 0; x < xCell; x++) {
                    this.grid[y][x] = new Cell(x, y);
                }
            }
        }
        
        set(board) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    this.grid[y][x].set(board.grid[y][x]);
                }
            }
        }
        
        fillRandom(percentage) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (Math.random() <= percentage) {
                        this.grid[y][x].born();
                    }
                    else {
                        this.grid[y][x].die();
                    }
                }
            }
        }       
}