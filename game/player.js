Game.Player = function (posX, posY) {
    Game.PhysicsObject.call(this);

    this.mass = 1000;

    (function (t, g) {
        g.beginFill(0xcccc00);
        g.drawRect(-40, -40, 80, 80);
        g.endFill();

        g.rotation = -Math.PI / 2;

        t.addChild(g);
    })(this, this.playerImage = new PIXI.Graphics());

    this.body = new p2.Body({
        mass: this.mass,
        position: [this.x, this.y]
    });

    this.body.addShape(new p2.Rectangle(80, 80));

    this.setPosition(posX, posY);

    this.engineLeft = new Game.Engine(this, -40, 0);
    this.engineRight = new Game.Engine(this, 40, 0);
};

Game.Player.prototype = Object.create(Game.PhysicsObject.prototype);
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

    Game.PhysicsObject.prototype.update.call(this, delta);
};

Game.Player.prototype.inject = function (world) {
    world.addBody(this.body);

    this.engineLeft.inject(world);
    this.engineRight.inject(world);

    this.parent.addChild(this.engineLeft);
    this.parent.addChild(this.engineRight);
};