const birdDom = document.getElementsByClassName('bird')[0];
const birdStyle = window.getComputedStyle(birdDom);
const birdWith = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
class Bird extends Square {
    constructor () {
        super(birdWith,birdHeight,150,150,0,0,birdDom);
        this.g = 1200;
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }
    // 扇动翅膀
    startSwing(){
        if(this.timer){
            return
        }
        this.timer = setInterval(() => {
            this.swingStatus ++;
            if(this.swingStatus === 4){
                this.swingStatus = 1;
            }
            this.render()
        }, 200);

    }
    // 停止煽动翅膀
    stopSwing(){
        clearInterval(this.timer)
        this.timer = null
    }
    // 给父类render添加自己的功能
    render(){
        super.render();
        // 添加此功能
        this.dom.className = `bird swing${this.swingStatus}`

    }
    move(duration){
        super.move(duration);
        this.ySpeed += duration * this.g
    }
    onMove(){
        if(this.y <= 0){
            this.y = 0
        }else if(this.y > parseFloat(floorTop) - parseFloat(this.height)){
            this.y = parseFloat(floorTop) - parseFloat(this.height)
        }
    }
    jump(){
        this.ySpeed = -300;
    }
}