export default class Cell {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = Math.random() >= 0.7;//false;
        this.color = this.alive ? COLOR.STAY: COLOR.DEAD;
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