// 所有物体的父类，定义相应的属性
class Square {
    constructor (width,height,x,y,xSpeed,ySpeed,dom) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom || document.createElement('div');
        // 构造出来后就进行一次渲染，让这些属性立即生效
        this.render();
    }
    // 父类的渲染功能
    render(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.x + 'px';
        this.dom.style.top = this.y + 'px'
    }
    // 父类的移动方案,通用
    move(duration) {
        const newLeft = this.xSpeed * duration;
        const newTop = this.ySpeed * duration;
        this.x += newLeft;
        this.y += newTop;
        // 处理特别的事,子类如果存在onMove方法就执行
        if(this.onMove){
            this.onMove();
        }
        //  执行渲染
        this.render();
    }
}