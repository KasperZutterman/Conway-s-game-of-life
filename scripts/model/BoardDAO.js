

export default class BoardDAO {
        
        constructor(width, height, cellWidth, cellHeight) {
            this.width = width;
            this.height = height;
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.gridData;
            this.cellsAlive = [];
            this.cellsDead = [];
            this.makeGridData(this.width, this.height);
            this.generation = 0;
        } 
        
        makeGridData(rows, cols) {
            this.gridData = [cols];
            for (var y = 0; y < cols; y++) {
                this.gridData[y] = [rows];
            }
            this.InitiateGrid(rows, cols);
        }
        
        InitiateGrid(rows, cols) {
            for (let y = 0; y < cols; y++) {
                for (let x = 0; x < rows; x++) {
                    this.gridData[y][x] = 0;
                }
            }
        }
        
        addData(board) {
            this.cellsAlive.push(0);
            this.cellsDead.push(0);
            for (let y = 0; y < board.height; y++) {
                for (let x = 0; x < board.width; x++) {
                    this.gridData[y][x] += board.grid[y][x].alive ? 1 : 0;
                    this.cellsAlive[this.generation] += board.grid[y][x].alive ? 1 : 0;
                    this.cellsDead[this.generation] += board.grid[y][x].alive ? 0 : 1;
                }
            }
            this.generation++;
        }
        
        getPopulationAlive() {
            return this.cellsAlive[this.generation - 1];
        }
        
        getPopulationDead() {
            return this.cellsDead[this.generation - 1];
        }
        
        getGeneration() {
            return this.generation;
        }
}
