// 游戏宽度
const TD = 30;
const TR = 30;
// 方块规模
const SQUAREWIDTH = 20;
// 游戏开始位置坐标
const GAMEX = 250;
const GAMEY = 50;
// 游戏速度
const SPEED = 100;
// 构造函数
function Square (x,y,width,height,dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // 映射到标签上去
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.update = function (x,y) {
    console.log(this.name,x,y)
    
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}
//创建元素对应的构造函数
// 创建构建游戏面板的构造函数单例
const Ground=tool.single(Square);    
// 构建游戏地板
const Floor=tool.extends(Square); 
// 围墙
const Wall=tool.extends(Square);    
// 蛇头单列
const SnakeHead=tool.single(Square); 
// 蛇身
const SnakeBody=tool.extends(Square); 
// 蛇
const Snake=tool.single(); 
// 事物
const Food=tool.single(Square); 
// 游戏
const Game = tool.single()

// 设计方向
const DIRACTON = {
    UP:{
        x:0,
        y:-1,
    },
    DOWN:{
        x:0,
        y:+1,
    },
    LEFT:{
        x:-1,
        y:0,
    },
    RIGHT:{
        x:+1,
        y:0,
    },
}

