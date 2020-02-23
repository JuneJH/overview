const floorDom = document.getElementsByClassName('earth')[0];
const floorStyle = window.getComputedStyle(floorDom);
const floorWith = parseFloat(floorStyle.width);
const floorHeight = parseFloat(floorStyle.height);
const floorTop = floorStyle.top;
class Floor extends Square {
    constructor () {
        super(floorWith,floorHeight,0,floorTop,-100,0,floorDom);
        
    }
    onMove(){
        if(-this.x >= gameWith / 2){
            this.x = 0;
        }
    }
}
