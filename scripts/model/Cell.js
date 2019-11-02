export default class Cell {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = false; //Math.random() >= 0.7;//false;
        this.color = this.alive ? COLOR.STAY: COLOR.DEAD;
    }
    
    set(cell) {
        this.x = cell.x;
        this.y = cell.y;
        this.alive = cell.alive;
        this.color = cell.color;
    }
    
    stay() {
        this.alive = true;
        this.color = COLOR.STAY;
    }
    
    born() {
        this.alive = true;
        this.color = COLOR.BORN;
    }
    
    die() {
        this.alive = false;
        this.color = COLOR.DEAD;
    }
       
}

const COLOR =  Object.freeze({
        DEAD : "#FFFFFF",
        BORN : "#FF0000",
        STAY : "#000000"
});