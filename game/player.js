Game.Player = function () {
    Game.GravityObject.call(this);

    this.mass = 1000;

    (function (t, g) {
        g.beginFill(0xcccc00);
        g.drawRect(-40, -20, 80, 40);
        g.drawRect(-5, -40, 10, 80);
        g.endFill();

        g.rotation = -Math.PI / 2;

        t.addChild(g);
    })(this, this.playerImage = new PIXI.Graphics());

    this.angularVelocity = 0;

    this.engineLeft = new Game.Engine(this, -40, 0);
    this.engineLeft.rotation = Math.PI + Math.PI / 2;

    this.engineRight = new Game.Engine(this, 40, 0);
    this.engineRight.rotation = Math.PI + Math.PI / 2;
};

Game.Player.prototype = Object.create(Game.GravityObject.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.Player.prototype.update = function (delta) {

    if(Game.Input.isUp()) {
        this.engineLeft.power += delta;
    }

    if(Game.Input.isDown()) {
        this.engineLeft.power -= delta;
    }

    var l = Game.Input.isLeft() / 3000;

    if (l) {
        if (l > 1) l = 1;

        this.engineLeft.power = this.engineLeft.maxPower * l;
    } else {
        this.engineLeft.power = 0
    }

    var r = Game.Input.isRight() / 3000;
    if (r) {
        if (r > 1) r = 1;

        this.engineRight.power = this.engineRight.maxPower * r;
    } else {
        this.engineRight.power = 0;
    }

    this.engineLeft.update(delta);
    this.engineRight.update(delta);

    this.rotation += this.angularVelocity * delta;

    Game.GravityObject.prototype.update.call(this, delta);
};

Game.Player.prototype.touch = function (touchWith) {
    Game.GravityObject.prototype.touch.call(this, touchWith);

    var l = this.velocity.len();

    this.velocity.set(this.x - touchWith.x, this.y - touchWith.y).lim(l * 0.8);
};