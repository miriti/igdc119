Ball = function () {
    GameObject.call(this);

    var g = new PIXI.Graphics();

    this.rad = 30 + Math.random() * 60;

    this.velicity = 30 + Math.random() * 200;
    this.vector = new Vector2(Math.random() * 100, Math.random() * 100);
    this.vector.lim(1);

    g.beginFill(Math.random() * 0xffffff);
    g.drawEllipse(0, 0, this.rad, this.rad);
    g.endFill();

    this.addChild(g);
};

Ball.prototype = Object.create(GameObject.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function (delta) {
    this.x += this.vector.x * (this.velicity * delta);
    this.y += this.vector.y * (this.velicity * delta);

    if (this.x > window.innerWidth - this.rad) {
        this.x = window.innerWidth - this.rad;
        this.vector.x *= -1;
    }

    if (this.x < this.rad) {
        this.x = this.rad;
        this.vector.x *= -1;
    }

    if (this.y > window.innerHeight - this.rad) {
        this.y = window.innerHeight - this.rad;
        this.vector.y *= -1;
    }

    if (this.y < this.rad) {
        this.y = this.rad;
        this.vector.y *= -1;
    }
};

GameMain = function () {
    GameState.call(this);

    for (var i = 0; i < 5000; i++) {
        var b = new Ball();
        b.x = Math.random() * window.innerWidth;
        b.y = Math.random() * window.innerHeight;

        this.addChild(b);
    }
};

GameMain.prototype = Object.create(GameState.prototype);
GameMain.prototype.constructor = GameMain;