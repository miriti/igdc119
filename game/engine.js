/**
 * Create an engine for a flayer
 *
 * @param flayer
 * @param atX
 * @param atY
 * @constructor
 */
Game.Engine = function (flayer, atX, atY) {
    Game.PhysicsObject.call(this);

    this.atX = atX || 0;
    this.atY = atY || 0;

    this.flayer = flayer;
    this.rotation = 0;
    this.maxPower = 1000;
    this.power = 0;
    this._powerVector = new Game.Vector2(1, 0);

    this.body = new p2.Body({
        mass: 10,
        fixedRotation: true
    });

    this.setPosition(flayer.x + atX, flayer.y + atY);

    this.connection = new p2.RevoluteConstraint(this.flayer.body, this.body, {
        localPivotA: [atX, atY],
        localPivotB: [0, 0]
    });

    var g = new PIXI.Graphics();
    g.beginFill(0xff0000);
    g.drawRect(-5, -10, 10, 20);
    g.endFill();

    this.addChild(g);
};

Game.Engine.prototype = Object.create(Game.PhysicsObject.prototype);
Game.Engine.prototype.constructor = Game.Engine;

Game.Engine.prototype.inject = function (world) {
    world.addBody(this.body);
    world.addConstraint(this.connection);
};

Game.Engine.prototype.update = function (delta) {
    Game.PhysicsObject.prototype.update.call(this, delta);

    if (this.power > this.maxPower) {
        this.power = this.maxPower;
    }

    if (this.power < 0) {
        this.power = 0;
    }

    this.rotation = this.flayer.rotation;

    if (this.power > 0) {
        // Calculating Force
        this._powerVector.set(Math.sin(this.rotation) * this.power, Math.cos(this.rotation) * this.power);

        this.body.velocity[0] = -this._powerVector.x;
        this.body.velocity[1] = -this._powerVector.y;
    }
};