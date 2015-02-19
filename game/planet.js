Game.Planet = function () {
    Game.GravityObject.call(this);
    this.mass = 500;
    this.initPlanet(40);
};

Game.Planet.prototype = Object.create(Game.GravityObject.prototype);
Game.Planet.prototype.constructor = Game.Planet;

Game.Planet.prototype.initPlanet = function (radius) {
    (function (t, g) {
        g.beginFill(0xcccccc);
        g.drawCircle(0, 0, radius);
        g.endFill();

        t.addChild(g);
    })(this, this.planetImage = new PIXI.Graphics());

};