// 创建一个构建水管的构造函数
class Pipe extends Square {
    constructor (height,y,speed,dom) {
        // 借用父类,继承私有属性
        super(52,height,gameWith,y,speed,0,dom)
        // 生成一个水管立即渲染,
        this.render();
    }
    // 移除不在视野的水管
    onMove(){
        if(this.x < -this.width){
            this.dom.remove();
        }
    }
}
// 生成一个随机数
function isRand(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}
// 生成一对水管
class PipePair {
    constructor () {
        const upHeight = isRand(parseFloat(floorTop) - 80 -100,80)
        const upDom = document.createElement('div')
        upDom.className = 'pipe up'
        this.upDom = new Pipe(upHeight,0,-100,upDom)
        const downDom = document.createElement('div');
        downDom.className = 'pipe down'
        const downHeight = parseFloat(floorTop) - upHeight - 150
        this.downDom = new Pipe(downHeight,parseFloat(floorTop) - downHeight,-100,downDom);
        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom)
    }
    // 此对象并没有继承Square
    move(duration){
        // 水管继承了的
        this.downDom.move(duration);
        this.upDom.move(duration);
    }
    // 计算属性,判断生成的水管是否移除了视野
    get unUse(){
        return this.upDom.x < - this.upDom.width
    }
}
// 管理生成多个水管
class PipeStroe {
    constructor(){
        // 真实的保存水管dom
        this.cache = [];
        this.timer = null;
        this.grade = 0;
        this.showDom = document.getElementById('grade')
    }
    // 开始生成
    startPipe(){
        this.timer = setInterval(() => {
            this.cache.push(new PipePair())
            // 真实移除不在视野的水管
            this.cache = this.cache.filter(ele=>{
                if(ele.unUse){
                    this.grade ++;
                    this.showDom.innerText = `GRADE:${this.grade}`
                    
                }
                return !(ele.unUse)
            })
         
        }, 1500);
    }
    // 停止生成
    stopPipe(){
        clearInterval(this.timer);
        this.tiemr = null;
    }
}


