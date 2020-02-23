// 工厂方法模式
function SquareFacrtoy () {

}
// 工厂方法模式初始化
SquareFacrtoy.prototype.init = function (color,msg) {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.left = this.x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = this.y * SQUAREWIDTH + 'px';
    this.viewContent.style.backgroundColor = color;
    // 统一添加touch方法
    this.touch = function () {
        return msg
    }
}

SquareFacrtoy.create = function (type,color,...arg) {
    if(SquareFacrtoy.prototype[type] == undefined){
        throw 'no type'
    }
    // 继承工厂
    if(SquareFacrtoy.prototype[type].prototype.__proto__ != SquareFacrtoy.prototype){
        SquareFacrtoy.prototype[type].prototype = new SquareFacrtoy();
    }
    const newObj = new SquareFacrtoy.prototype[type](color,...arg)
    return newObj;
}

SquareFacrtoy.prototype.Wall = function (color,...arg) {
    // 利用前面的构造函数进行创建
    const newObj = new Wall(...arg);
    this.init.call(newObj,color,touchState.die)
    return newObj;
}
SquareFacrtoy.prototype.Floor = function (color,...arg) {
    const newObj = new Floor(...arg);
    this.init.call(newObj,color,touchState.move)
    return newObj;
}
SquareFacrtoy.prototype.SnakeHead = function (color,...arg) {
    const snakeHead = new SnakeHead(...arg);
    snakeHead.name = 'snakeHead'
    this.init.call(snakeHead,color,touchState.die)
    snakeHead.update(...arg)
    return snakeHead;
}
SquareFacrtoy.prototype.SnakeBody = function (color,...arg) {
    const newObj = new SnakeBody(...arg);
    this.init.call(newObj,color,touchState.die)
    return newObj;
}
SquareFacrtoy.prototype.Food = function (color,...arg) {
    const newObj = new Food(...arg);
    this.init.call(newObj,color,touchState.eat)
    newObj.update(...arg)


    return newObj;
}
// 处理相碰状态
const touchState = {
    die:'die',
    move:'move',
    eat:'eat'
}
