Game.Planet = function () {
    Game.GravityObject.call(this);
    this.mass = 500000e10;
    this.static = true;
    this.initPlanet(500);
};

Game.Planet.prototype = Object.create(Game.GravityObject.prototype);
Game.Planet.prototype.constructor = Game.Planet;

Game.Planet.prototype.initPlanet = function (radius) {
    this.radius = radius;
    (function (t, g) {
        var path = [];

        var a = 0;
        var segments = 120;

        while (a < Math.PI * 2) {
            path.push(new PIXI.Point(Math.cos(a) * radius, Math.sin(a) * radius));
            a += (Math.PI * 2) / segments;
        }

        g.beginFill(0xcccccc);
        g.drawPolygon(path);
        g.endFill();

        t.addChild(g);
    })(this, this.planetImage = new PIXI.Graphics());

};