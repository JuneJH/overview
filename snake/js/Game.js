// 构建一个管理游戏进程对象
const oGame = new Game();
// 定时器
oGame.timer = null;
// 成绩
oGame.grade = 0;
oGame.init = function (ground) {
    // 初始化界面
    // 初始化界面
    oGround.init()
    // 初始化蛇
    oSnake.init(ground)
    // 创建第一个事物
    oGame.createFood();
    // oGround.init()
    // 绑定方向事件
    // 做一个防抖，解决快速变相bug
    document.onkeydown = (function () {
        let timer = null;
        return function (e) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                if (e.keyCode == 37 && oSnake.diractionDefault != DIRACTON.RIGHT) {
                    oSnake.diractionDefault = DIRACTON.LEFT;
                } else if (e.keyCode == 38 && oSnake.diractionDefault != DIRACTON.DOWN) {
                    oSnake.diractionDefault = DIRACTON.UP;
                } else if (e.keyCode == 39 && oSnake.diractionDefault != DIRACTON.LEFT) {
                    oSnake.diractionDefault = DIRACTON.RIGHT;
                } else if (e.keyCode == 40 && oSnake.diractionDefault != DIRACTON.UP) {
                    oSnake.diractionDefault = DIRACTON.DOWN;
                }
            }, 100)
        }
    })()
    //绑定开始按钮
    const btn = document.getElementById('btn');
    btn.onclick = function () {

        oGame.timer = setInterval(() => {
            oSnake.move(ground)
        }, SPEED)
    }
}
oGame.over = function () {
    clearInterval(oGame.timer)
    alert('over!!!!  ' + 'Grade:' + oGame.grade)
}
oGame.createFood = function () {
    let flag = true;
    while (flag) {
        const x = 1 + Math.floor((Math.random() * (TD - 2)))
        const y = 1 + Math.floor((Math.random() * (TR - 2)))
        let ok = true;
        for (let node = oSnake.head; node; node = node.next) {
            if (node.x == x && node.y == y) {
                ok = false;
                break;
            }
        }
        if (ok) {
            const food = SquareFacrtoy.create('Food', 'yellow', x, y, SQUAREWIDTH, SQUAREWIDTH)
            oGround.remove(x, y);
            oGround.append(food);
            console.log(x, y)
            break;
        }

    }
}
// 优化得到事物的算法
// oGround.createFood = function () {

// }
oGame.init(oGround)
