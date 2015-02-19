Game.Player = function () {
    Game.GravityObject.call(this);

    this.mass = 0.01;

    (function (t, g) {
        g.beginFill(0xff0000);
        g.drawPolygon(-10, 10, 10, 10, 0, -20);
        g.endFill();

        g.rotation = -Math.PI / 2;

        t.addChild(g);
    })(this, this.playerImage = new PIXI.Graphics());

    this.velocity.set(-10, -200);
    this.direction = new Game.Vector2(-10, -200);
};

Game.Player.prototype = Object.create(Game.GravityObject.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.Player.prototype.update = function (delta) {
    var ox = this.x;
    var oy = this.y;

    this.rotation = Math.atan2(this.direction.y, this.direction.x);

    if(Game.Input.isUp()) {
        this.velocity.lengthen(1);
    }

    if(Game.Input.isDown()) {
        this.velocity.lengthen(-1);
    }

    Game.GravityObject.prototype.update.call(this, delta);

    this.direction.set(ox - this.x, oy - this.y);
};