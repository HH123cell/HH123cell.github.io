// 需求分析：
// 1.0 初始化
// 2.0 绘制蛇
// 3.0 绘制地图
// 4.0 初始化食物
// 5.0 创建食物
// 6.0 事件监听
// 7.0 蛇移动函数
// 8.0 蛇头和食物碰撞检测
// 9.0 重新绘制 更新地图 更新蛇 检测蛇和食物碰撞 复制蛇
// 10. 吃到食物 添加蛇身体
// 11. 判断是否结束游戏
// 12. 复制蛇 记录一份关于蛇的坐标，用于判断是否结束游戏

// 加载页面
window.onload = function () {
    // 创建构造函数 SnakeGame的实例
    var app = new SnakeGame({
        width: 600,
        height: 600,
        canvas: document.getElementById("canvas"),
        ctx: this.canvas.getContext("2d")
    });
    // console.log(app)
    // 调用原型的init方法
    app.init();
}


// 1.0 定义构造函数
function SnakeGame(option) {
    // 添加属性 
    // 画布的大小
    this.width = option.width;
    this.height = option.height;
    // 画布标签
    this.canvas = option.canvas;
    // 绘制图形图像的环境（对象）
    this.ctx = option.ctx;
    // 每个个字大小
    this.space = 30;
    // 设置画布的大小
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // 计算多少行
    this.row = this.height / this.space;
    // 多少列
    this.column = this.width / this.space;
    // 添加数组（记录蛇）
    this.snakeArray = [
        {
            x: 0,
            y: 0,
            color: "blue"
        },
        {
            x: this.space,
            y: 0,
            color: "blue"
        },
        {
            x: this.space * 2,
            y: 0,
            color: "red"
        }
    ];
    // 添加食物的坐标
    this.food = {
        x: this.space * 5,
        y: this.space * 5,
        color: "green"
    }
    // 添加蛇移动的方向 (朝着右边移动)
    this.direction = "right";
}
// 2.0 在构造函数的原型上添加方法  初始化
SnakeGame.prototype.init = function () {
    console.log(this);
    // 调用绘制地图的函数
    this.drawMap();
    // 初始化的蛇
    this.drawInitSnake();
    // 绘制食物
    this.drawInitFood();
    // 调用监听事件的函数
    this.addEventFunc();


    // 测试
    // this.createFood();
    var _this = this;
    this.timer = setInterval(function () {
        // 测试蛇移动的逻辑
        // _this.snakeMove();
    }, 300)
}
// 3.0 在构造函数的原型上添加方法 绘制地图
SnakeGame.prototype.drawMap = function () {
    // 绘制行
    for (var i = 0; i <= this.row; i++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(0, i * this.space);
        this.ctx.lineTo(this.width, i * this.space);
        this.ctx.closePath();
        this.ctx.stroke()
    }

    // 绘制列
    for (var j = 0; j <= this.row; j++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(j * this.space, 0);
        this.ctx.lineTo(j * this.space, this.height);
        this.ctx.closePath();
        this.ctx.stroke()
    }
}
// 4.0 在构造函数的原型上添加方法 绘制蛇（初始化）
SnakeGame.prototype.drawInitSnake = function () {
    for (var i = 0; i < this.snakeArray.length; i++) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.snakeArray[i].color;
        this.ctx.rect(this.snakeArray[i].x, this.snakeArray[i].y, this.space, this.space);
        this.ctx.closePath();
        this.ctx.fill()
    }
}
// 5.0 在构造函数的原型上添加方法 绘制食物 
SnakeGame.prototype.drawInitFood = function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.food.color;
    this.ctx.rect(this.food.x, this.food.y, this.space, this.space);
    this.ctx.closePath();
    this.ctx.fill();
}
// 6.0 在构造函数的原型上添加方法 随机数
SnakeGame.prototype.random = function (min, max) {
    // 10~15
    // 返回指定范围的随机数
    return Math.floor(Math.random() * (max - min) + min);
}
// 7.0 在构造函数的原型上添加方法 创建食物
SnakeGame.prototype.createFood = function () { //函数作用域
    // 记录当前函数作用域的this
    // var _this = this;
    // 随机的坐标
    this.food = {
        x: this.random(0, this.column) * this.space,
        y: this.random(0, this.row) * this.space,
        color: "green"
    }
    console.log(this.food)
    // 定义一个布尔值
    var bool = false;
    // 循环蛇数组 snakeArray
    for (var i = 0; i < this.snakeArray.length; i++) {
        // 判断创建的食物坐标是否在蛇的身体上
        if (this.food.x == this.snakeArray[i].x && this.food.y == this.snakeArray[i].y) {
            bool = true;
        }
    }
    // 如果bool为true 说明创建的食物在蛇身体上
    if (bool) {
        this.createFood();
    }
    // 绘制食物
    this.ctx.beginPath();
    this.ctx.fillStyle = this.food.color;
    this.ctx.rect(this.food.x, this.food.y, this.space, this.space);
    this.ctx.closePath();
    this.ctx.fill();
}
// 8.0 在构造函数的原型上添加方法 监听键盘的事件 改变direction
SnakeGame.prototype.addEventFunc = function () { //函数作用域1
    // 记录当前函数作用域的this
    var _this = this;
    // 给页面绑定键盘按下的事件
    document.onkeydown = function (event) { //函数作用域2
        // 键值码
        var keyCode = event.keyCode;
        // 判断 如果蛇往右移动 禁止按向左按键
        // if(_this.direction=="right" && keyCode == 37){
        //     return ;
        // }
        // if(_this.direction=="left" && keyCode == 39){
        //     return ;
        // }
        // if(_this.direction=="down" && keyCode == 38){
        //     return ;
        // }
        // if(_this.direction=="up" && keyCode == 40){
        //     return ;
        // }
        // 判断keycode的值 设置蛇移动的方向
        // if( keyCode == 37 ){
        //     _this.direction="left";
        // }
        // if( keyCode == 39 ){
        //     _this.direction="right";
        // }
        // if( keyCode == 40 ){
        //     _this.direction="down";
        // }
        // if( keyCode == 38 ){
        //     _this.direction="up";
        // }

        // 键值码等于40 方向不是向上的话
        if (keyCode == 40 && _this.direction != "up") {
            //设置direction等于down 向下
            _this.direction = "down";
        }
        if (keyCode == 38 && _this.direction != "down") {
            _this.direction = "up";
        }
        if (keyCode == 39 && _this.direction != "left") {
            _this.direction = "right";
        }
        if (keyCode == 37 && _this.direction != "right") {
            _this.direction = "left";
        }

        console.log({ direction: _this.direction })

    }
}
// 9.0 在构造函数的原型上添加方法 设置蛇移动的逻辑
SnakeGame.prototype.snakeMove = function () {
    // 定义蛇移动的值
    var x = 0;
    var y = 0;
    // 控制语句
    switch (this.direction) {
        case "right":
            x += this.space;
            break;
        case "left":
            x -= this.space;
            break;
        case "down":
            y += this.space;
            break;
        case "up":
            y -= this.space;
            break;
    }
    // 更新蛇身体的坐标 
    for(var i = 0 ; i < this.snakeArray.length-1 ;i++){
        this.snakeArray[i].x = this.snakeArray[i+1].x;
        this.snakeArray[i].y = this.snakeArray[i+1].y;
    }

    // 更新蛇头的坐标
    this.snakeArray[this.snakeArray.length-1].x +=x;
    this.snakeArray[this.snakeArray.length-1].y +=y;

    // 重新绘制蛇
    for(var j = 0 ; j < this.snakeArray.length;j++){
        this.ctx.beginPath();
        this.ctx.fillStyle=this.snakeArray[j].color;
        this.ctx.rect(this.snakeArray[j].x ,this.snakeArray[j].y ,this.space ,this.space);
        this.ctx.closePath();
        this.ctx.fill();
    }

}


// ...  剩下的逻辑，星期天的早上来完成