Game.Planet = function () {
    Game.GameObject.call(this);
    this.mass = 10;
    this.static = true;
    this.initPlanet(500, 400);
};

Game.Planet.prototype = Object.create(Game.GameObject.prototype);
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

};

Game.Planet.prototype.attract = function (obj) {
    var vector = new Game.Vector2(this.x - obj.x, this.y - obj.y).lim(this.mass);
    obj.velocity.add(vector.x, vector.y);
};

Game.Planet.prototype.update = function (delta) {
    Game.GameObject.prototype.update.call(this, delta);

    for (var i = 0; i < Game.gameObjects.length; i++) {
        var obj = Game.gameObjects[i];

        if ((obj !== this) && (obj instanceof Game.GravityObject) && Game.Vector2.prototype.dist2(this.x, this.y, obj.x, obj.y) <= Math.pow(this.radius + this.atmosphere, 2)) {
            if (Game.Vector2.prototype.dist2(this.x, this.y, obj.x, obj.y) <= Math.pow(this.radius, 2)) {
                obj.touch(this);
            } else {
                this.attract(obj);
            }
        }
    }
};