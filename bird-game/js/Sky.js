const skyDom = document.getElementsByClassName('sky')[0];
const skyStyle = window.getComputedStyle(skyDom);
const skyWith = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);
const gameDom = document.getElementsByClassName('game-area')[0]
const gameWith = gameDom.offsetWidth;
class Sky extends Square {
    constructor () {
        super (skyWith,skyHeight,0,0,-10,0,skyDom);
        
    }
    onMove(){
        if(-this.x >= gameWith / 2){
            this.x = 0;
        }
    }
}