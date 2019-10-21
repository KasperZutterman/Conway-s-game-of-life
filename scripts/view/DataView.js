

export default class DataView {
        
        constructor(canvas, boardDAO) {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.boardDAO = boardDAO;
        }
        
        draw() {
            
            for (let y = 0; y < this.boardDAO.height; y++) {
                for (let x = 0; x < this.boardDAO.width; x++) {
                    this.drawCell(x, y, this.boardDAO.cellWidth, this.boardDAO.cellHeight);
                }
            }
        }
        
        drawCell(x, y, cellWidth, cellHeight) {
            this.context.fillStyle = this.heatMapColorForValue(this.boardDAO.gridData[y][x] / this.boardDAO.generation);
            this.context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
        
        heatMapColorForValue(value) {
            var h = (1.0 - value) * 240
            return "hsl(" + h + ", 100%, 50%)";
        }
}