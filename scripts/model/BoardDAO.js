

export default class BoardDAO {
        
        constructor() {
            this.gridData;
            this.makeGridData();
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
        
}


