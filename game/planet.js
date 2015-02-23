Game.Planet = function () {
    Game.PhysicsObject.call(this);
    this.mass = 10;
    this.static = true;
    this.initPlanet(500, 400);
};

Game.Planet.prototype = Object.create(Game.PhysicsObject.prototype);
Game.Planet.prototype.constructor = Game.Planet;

Game.Planet.prototype.initPlanet = function (radius, atmosphere) {
    this.radius = radius;
    this.atmosphere = atmosphere;

    (function (t, g) {
        g.beginFill(0xffffff, 0.2);
        g.drawPolygon(Game.Utils.circlePath(radius + atmosphere, 120));
        g.endFill();

        g.beginFill(0xcccccc, 1);
        g.drawPolygon(Game.Utils.circlePath(radius, 120));
        g.endFill();

        t.addChild(g);
    })(this, this.planetImage = new PIXI.Graphics());

    this.body = new p2.Body({
        mass: 0,
        position: [0, 0]
    });

    this.body.addShape(new p2.Circle(this.radius));
};

Game.Planet.prototype.inject = function (world) {
    world.addBody(this.body);
};

Game.Planet.prototype.update = function (delta) {
    Game.GameObject.prototype.update.call(this, delta);
};