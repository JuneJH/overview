class Game {
    constructor () {
        this.pipeStroe = new PipeStroe();
        this.floor = new Floor();
        this.bird = new Bird();
        this.sky = new Sky();
        this.tick = 16;
        this.timer = null;
        this.gameOver = false;
        this.grade = 0
    }
    // 检测碰撞
    isTouch(square1,square2){
        // 两个物体是否碰撞
        const x1 = square1.x + square1.width / 2;
        const y1 = square1.y + square1.height / 2;
        const x2 = square2.x + square2.width / 2;
        const y2 = square2.y + square2.width / 2;
        const disX = Math.abs(x1 - x2);
        const disY = Math.abs(y1 - y2);
        if(disX < (square2.width + square1.width) / 2 && disY < (square1.height + square2.height) / 2){
             return true;
        }
        return false;
    }
    getGrade(s1,s2){
        // this.pipeStroe.cache(ele=>{
        //     this.getGrade(this.bird,ele)
        // })
        console.log(s1,s2)
        if(s1.x > s2.x){
            this.grade ++
        }
        console.log(this.grade)

    }
    // 游戏结束
    isGameOver(){
        if(this.bird.y === parseFloat(floorTop) - parseFloat(this.bird.height)){
            return true
        }
        for(let i = 0; i < this.pipeStroe.cache.length; i ++){
            if(this.isTouch(this.pipeStroe.cache[i].upDom,this.bird) || this.isTouch(this.pipeStroe.cache[i].downDom,this.bird)){
                return true;
            }
        }
        return false;
    }
    // 开始游戏
    start(){
        if(this.timer){
            console.log(1234)
            return;
        }
        if(this.gameOver){
            return
        }
        this.pipeStroe.startPipe();
        this.bird.startSwing();
        const duration = this.tick / 1000;
        this.timer = setInterval(() => {
            this.sky.move(duration)
            this.floor.move(duration)
            this.bird.move(duration)
            this.pipeStroe.cache.forEach(ele=>{
                ele.move(duration)
            })
           if(this.isGameOver()){
               this.stop();
               this.gameOver = true
               if(this.gameOver){
                   document.getElementsByClassName('moke')[0].style.display = 'block'
               }
           }
        }, this.tick);
    }
    stop(){
        clearInterval(this.timer)
        this.timer = null;
        this.bird.stopSwing();
        this.pipeStroe.stopPipe()
    }
    reginEvent(){
        document.onkeydown = (e) => {
            if(e.key == " "){
                this.bird.jump();
            }else if(e.key == "Enter"){
                if(this.timer != null){
                    console.log('stop')
                    this.stop()
                }else{
                    this.start()
                }
            }
            
        }

    }
}

const g = new Game();
g.reginEvent()