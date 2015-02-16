Ball = function (t) {
    PIXI.Sprite.call(this, t);

    this.rad = 20 + Math.random() * 100;

    this.width = this.rad;
    this.height = this.rad;

    this.pivot = new PIXI.Point(this.width / 2, this.height / 2);

    this.velicity = 30 + Math.random() * 200;
    this.vector = new Vector2(Math.random() * 100, Math.random() * 100);
    this.vector.lim(1);
};

Ball.prototype = Object.create(PIXI.Sprite.prototype);
Ball.prototype.constructor = Ball;

GameMain = function () {
    GameState.call(this);

    var texture = PIXI.Texture.fromImage("sprite.png");

    var batch = new PIXI.SpriteBatch();

    this.balls = [];

    for (var i = 0; i < 10000; i++) {
        var b = new Ball(texture);
        b.x = Math.random() * window.innerWidth;
        b.y = Math.random() * window.innerHeight;

        batch.addChild(b);

        this.balls.push(b);
    }

    this.addChild(batch);

};

GameMain.prototype = Object.create(GameState.prototype);
GameMain.prototype.constructor = GameMain;

GameMain.prototype.update = function (delta) {
    for (var i = 0; i < this.balls.length; i++) {
        (function (b) {
            b.x += b.vector.x * (b.velicity * delta);
            b.y += b.vector.y * (b.velicity * delta);

            if (b.x > window.innerWidth - b.rad * 2) {
                b.x = window.innerWidth - b.rad * 2;
                b.vector.x *= -1;
            }

            if (b.x < 0) {
                b.x = 0;
                b.vector.x *= -1;
            }

            if (b.y > window.innerHeight - b.rad * 2) {
                b.y = window.innerHeight - b.rad * 2;
                b.vector.y *= -1;
            }

            if (b.y < 0) {
                b.y = 0;
                b.vector.y *= -1;
            }

            b.rotation += 1 * delta;
        })(this.balls[i]);
    }
}