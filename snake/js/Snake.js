// 创建一个对象，管理蛇
const oSnake = new Snake();
// 设置默认方向，后面修改此值即可变相
oSnake.diractionDefault = DIRACTON.RIGHT;
// 初始化蛇
oSnake.init = function (ground) {
    // 创建蛇头
    const oSnakeHead = new SquareFacrtoy.create('SnakeHead', 'blue', 3, 1, SQUAREWIDTH, SQUAREWIDTH);
    const oSnakeBody1 = new SquareFacrtoy.create('SnakeBody', 'red', 2, 1, SQUAREWIDTH, SQUAREWIDTH);
    const oSnakeBody2 = new SquareFacrtoy.create('SnakeBody', 'red', 1, 1, SQUAREWIDTH, SQUAREWIDTH);
    // 保存蛇头和蛇尾
    this.head = oSnakeHead;
    this.tail = oSnakeBody2;
    // 把蛇添加到游戏面板
    ground.remove(oSnakeHead.x, oSnakeHead.y);
    ground.append(oSnakeHead);
    ground.remove(oSnakeBody1.x, oSnakeBody1.y);
    ground.append(oSnakeBody1);
    ground.remove(oSnakeBody2.x, oSnakeBody2.y);
    ground.append(oSnakeBody2);
    // 利用双向链表，关联蛇身，蛇头
    oSnakeHead.next = oSnakeBody1;
    oSnakeHead.last = null;
    oSnakeBody1.next = oSnakeBody2;
    oSnakeBody1.last = oSnakeHead;
    oSnakeBody2.next = null;
    oSnakeBody2.last = oSnakeBody1;
}
// 处理运动状态，蛇的行为  策略
oSnake.strategy = {
    move(square, isDlete) {
        // 一定要先创建蛇身，蛇身依赖之前的蛇头
        const newBody = SquareFacrtoy.create('SnakeBody', 'red', oSnake.head.x, oSnake.head.y, SQUAREWIDTH, SQUAREWIDTH)
        const newHead = SquareFacrtoy.create('SnakeHead', 'blue', square.x, square.y, SQUAREWIDTH, SQUAREWIDTH);
        //用新的蛇身替换原蛇头    
        oSnake.head.next.last = newBody;
        newBody.next = oSnake.head.next;
        //  加入新的蛇头 
        newBody.last = newHead;
        newHead.next = newBody;
        newHead.last = null;
        // 修改保存的蛇头
        oSnake.head = newHead;
        // 加入到游戏面板
        oGround.remove(newHead.x, newHead.y);
        oGround.append(newHead);
        oGround.append(newBody);
        // 删除尾巴，如果时吃的状态就不删除
        if (!isDlete) {
            // 创建一块新的地板，用来补充删除的蛇尾
            const newSquare = SquareFacrtoy.create('Floor', '#008c8c', oSnake.tail.x, oSnake.tail.y, SQUAREWIDTH, SQUAREWIDTH);
            oGround.remove(oSnake.tail.x, oSnake.tail.y);
            oGround.append(newSquare);
            oSnake.tail = oSnake.tail.last;

        }



    },
    // 吃行为，统计分，
    eat(square) {
        oGame.grade++;
        // 一定要先进行吃事物，后再创建事物，创建新的蛇头时，依赖参数即事物对象
        this.move(square, true)
        oGame.createFood()

    },
    die() {
        oGame.over();
    }
}
// 预判
oSnake.move = function (ground) {
    const nextSquare = ground.oArr[this.head.y + this.diractionDefault.y][this.head.x + this.diractionDefault.x]
    // console.log(nextSquare,nextSquare.touch())
    this.strategy[nextSquare.touch()](nextSquare);

}
