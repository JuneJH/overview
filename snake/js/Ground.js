// 创建一个游戏界面
const oGround = new Ground(GAMEX,GAMEY,TD * SQUAREWIDTH,TR * SQUAREWIDTH);
// 初始化
oGround.init = function () {
    oGround.viewContent.style.position = 'absolute';
    oGround.viewContent.style.width = this.width + 'px';
    oGround.viewContent.style.height = this.height + 'px';
    oGround.viewContent.style.left = this.x + 'px';
    oGround.viewContent.style.top = this.y + 'px';
    oGround.viewContent.style.backgroundColor = '#999';
    document.body.appendChild(oGround.viewContent);
    // 保存界面填充的方块包括墙，地板，事物，蛇
    // 二维数组的结构
    this.oArr = []
    for(let y = 0; y < TR ; y ++){
        this.oArr[y] = new Array(TD) 
        for(let x = 0; x < TD ; x ++){
            let o;
            if(x == 0 || y == 0 || x == TR - 1 || y == TD - 1){
                o = SquareFacrtoy.create('Wall','#000',x,y,SQUAREWIDTH,SQUAREWIDTH);
            }else{
                o = SquareFacrtoy.create('Floor','#008c8c',x,y,SQUAREWIDTH,SQUAREWIDTH);
            }
            oGround.viewContent.appendChild(o.viewContent);
            this.oArr[y][x] = o;
        }
    }
}
// 为游戏界面提供移除方块功能
oGround.remove = function (x,y) {
    const square = this.oArr[y][x];
    // 内部移除
    this.oArr[y][x] = null;
    // 可视移除
    oGround.viewContent.removeChild(square.viewContent)
}
// 为游戏界面提供增加方块功能
oGround.append = function (square) {
    // 可视添加
    oGround.viewContent.appendChild(square.viewContent);
    // 内部添加
    this.oArr[square.y][square.x] = square
}
