Game.Gravity = {
    constant: 6.6742e-11,
    objects: []
};

Game.GravityObject = function () {
    Game.GameObject.call(this);

    this.radius = 0;
    this.mass = 0;
    this.velocity = new Game.Vector2(0, 0);
    this.static = false;

    Game.Gravity.objects.push(this);
};

Game.GravityObject.prototype = Object.create(Game.GameObject.prototype);
Game.GravityObject.prototype.constructor = Game.GravityObject;

Game.GravityObject.prototype.update = function (delta) {
    this.x += this.velocity.x * delta;
    this.y += this.velocity.y * delta;

    var lenV = new Game.Vector2();

    for (var i = Game.Gravity.objects.length - 1; i >= 0; i--) {
        var op = Game.Gravity.objects[i];
        if ((op != this) && (!op.static)) {
            lenV.set(this.x - op.x, this.y - op.y);
            var r = lenV.len();

            if (r <= this.radius + op.radius) {
                this.touch(op);
                op.touch(this);
            } else {
                // TODO proper gravity attraction
            }
        }
    }

    Game.GameObject.prototype.update.call(this, delta);
};

Game.GravityObject.prototype.destroy = function () {
    Game.GameObject.prototype.destroy.call(this);
    var index;

    if ((index = Game.Gravity.objects.indexOf(this)) != -1) {
        delete Game.Gravity.objects[index];
    }
};

Game.GravityObject.prototype.touch = function (touchWith) {
};