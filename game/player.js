Game.Player = function () {
    Game.GravityObject.call(this);

    this.mass = 1000;

    (function (t, g) {
        g.beginFill(0xff0000);
        g.drawPolygon(-10, 10, 10, 10, 0, -20);
        g.endFill();

        g.rotation = -Math.PI / 2;

        t.addChild(g);
    })(this, this.playerImage = new PIXI.Graphics());

    this.direction = new Game.Vector2(-10, -200).lim(1);

    this.drawTrail = false;
    this.trail = new PIXI.Graphics();
};

Game.Player.prototype = Object.create(Game.GravityObject.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.Player.prototype.update = function (delta) {
    var ox = this.x;
    var oy = this.y;

    this.rotation = Math.atan2(this.direction.y, this.direction.x);

    if(Game.Input.isUp()) {
        if (this.velocity.len2() == 0) {
            this.velocity.set(1, 0);
        }
        this.velocity.lengthen(10);
    }

    if(Game.Input.isDown()) {
        this.velocity.lengthen(-10);
    }

    if (Game.Input.isLeft()) {
        this.velocity.turn(-Math.PI / 32);
    }

    if (Game.Input.isRight()) {
        this.velocity.turn(Math.PI / 32);
    }

    Game.GravityObject.prototype.update.call(this, delta);

    if (this.drawTrail) {
        this.trail.beginFill(0xffffff);
        this.trail.lineStyle(5, 0xffffff);
        this.trail.moveTo(ox, oy);
        this.trail.lineTo(this.x, this.y);
        this.trail.endFill();
    }

    if ((ox != this.y) || (oy != this.y)) {
        this.direction.set(ox - this.x, oy - this.y);
    }
};

Game.Player.prototype.touch = function (touchWith) {
    Game.GravityObject.prototype.touch.call(this, touchWith);

    var l = this.velocity.len();

    this.velocity.set(this.x - touchWith.x, this.y - touchWith.y).lim(l);
};