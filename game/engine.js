Game.EngineView = function (engine) {
    Game.GameObject.call(this);

    var g = new PIXI.Graphics();

    g.beginFill(0xff0000);
    g.drawPolygon([0, 0, -20, 10, -20, -10]);
    g.endFill();

    this.addChild(g);

    this.engine = engine;
};

Game.EngineView.prototype = Object.create(Game.GameObject.prototype);
Game.EngineView.prototype.constructor = Game.EngineView;

Game.EngineView.prototype.update = function (delta) {
    Game.GameObject.prototype.update.call(this, delta);
};

/**
 * Create an engine for a flayer
 *
 * @param flayer
 * @param atX
 * @param atY
 * @constructor
 */
Game.Engine = function (flayer, atX, atY) {
    atX = atX || 0;
    atY = atY || 0;

    this.view = new Game.EngineView(this);
    this.view.x = atX;
    this.view.y = atY;

    flayer.addChild(this.view);

    this.flayer = flayer;
    this.rotation = 0;
    this.maxPower = 10;
    this.power = 0;
    this._powerVector = new Game.Vector2(1, 0);
};

Game.Engine.prototype.constructor = Game.Engine;

Game.Engine.prototype.update = function (delta) {

    if (this.power > this.maxPower) {
        this.power = this.maxPower;
    }

    if (this.power < 0) {
        this.power = 0;
    }

    this.view.rotation = this.rotation;

    this._powerVector.set(Math.cos(this.flayer.rotation + this.rotation) * this.power, Math.sin(this.flayer.rotation + this.rotation) * this.power);
    this.flayer.velocity.add(this._powerVector);

    if (this.power > 0) {
        var spark = new Game.Particle(Game.Resources.textures['spark']);

        spark.velocity.set(-this._powerVector.x + Math.random() * 0.1, -this._powerVector.y + Math.random() * 0.1).lim(this.power * 100).add(this.flayer.velocity);

        spark.x = this.flayer.x + this.view.x - (this._powerVector.x / this._powerVector.len()) * 20;
        spark.y = this.flayer.y + this.view.y - (this._powerVector.y / this._powerVector.len()) * 20;

        Game.mainInstance.particlesContainer.addChild(spark);
    }
};