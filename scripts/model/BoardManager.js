import Board from './Board.js'
//import BoardView from '../view/BoardView.js'

export default class BoardManager {
        
        constructor(width, height, cellWidth, cellHeight, boardView) {
            this.width = width;
            this.height = height;
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.boardView = boardView;
            this.board1 = new Board(this.width, this.height, this.cellWidth, this.cellHeight);
            this.board2 = new Board(this.width, this.height, this.cellWidth, this.cellHeight);
            this.board1Old = false;
        }
        
        calculateNextBoard(bNew, bOld) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let aliveNeighbours = this.calcAliveNeighbours(bOld, x, y);
                    
                    if (bOld.grid[y][x].alive && (aliveNeighbours == 2 || aliveNeighbours == 3)) {
                        bNew.grid[y][x].stay();
                    }
                    else if (!bOld.grid[y][x].alive && aliveNeighbours == 3) {
                        bNew.grid[y][x].born();
                    }
                    else {
                        bNew.grid[y][x].die();
                    }
                }
            }
        }
        
        calcAliveNeighbours(board, xCell, yCell) {
            let count = 0;
            for (let y = yCell - 1; y <= yCell + 1; y++) {
                for (let x = xCell - 1; x <= xCell + 1; x++) {
                    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {    
                       count +=  board.grid[y][x].alive ? 1 : 0;
                    }
                }
            }
            count -= board.grid[yCell][xCell].alive ? 1 : 0;
            return count;
        }
        
        drawBoard() {
            if (this.board1Old) {
                this.boardView.draw(this.board2);
            } else {
                this.boardView.draw(this.board1);
            }      
        }
        
        drawOldBoard() {
            if (this.board1Old) {
                this.boardView.draw(this.board1);
            } else {
                this.boardView.draw(this.board2);
            }      
        }
        
        drawGrid() {
            this.boardView.drawGrid(this.board1);
        }
        
        getGrid() {
            if (this.board1Old) {
                return this.board2;
            } else {
                return this.board1;
            }
        }
        
        nextGeneration() {
            if (this.board1Old) {
                this.calculateNextBoard(this.board2, this.board1);
            } else {
                this.calculateNextBoard(this.board1, this.board2);
            }
            this.drawBoard();
            this.board1Old = !this.board1Old;
        }
        
        setCell(x, y, alive) {
            if (alive) {
                if (this.board1Old) {
                    this.board1.grid[y][x].born();
                } else {
                    this.board2.grid[y][x].born();
                }
            }
            else {
               if (this.board1Old) {
                    this.board1.grid[y][x].die();
                } else {
                    this.board2.grid[y][x].die();
                } 
            }
        }
}
