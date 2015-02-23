Game.PhysicsObject = function () {
    Game.GameObject.call(this);

    this.body == null;
};

Game.PhysicsObject.prototype = Object.create(Game.GameObject.prototype);
Game.PhysicsObject.prototype.constructor = Game.PhysicsObject;

Game.PhysicsObject.prototype.setPosition = function (nx, ny) {
    this.x = nx;
    this.y = ny;
    this.body.position[0] = nx;
    this.body.position[1] = ny;
};

Game.PhysicsObject.prototype.initBody = function () {

};

Game.PhysicsObject.prototype.inject = function (world) {

};

Game.PhysicsObject.prototype.update = function (delta) {
    Game.GameObject.prototype.update.call(this, delta);

    if (this.body != null) {
        this.x = this.body.position[0];
        this.y = this.body.position[1];

        this.rotation = this.body.angle;
    }
};