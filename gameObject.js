Game.GameObject = function () {
    PIXI.DisplayObjectContainer.call(this);
};

Game.GameObject.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Game.GameObject.prototype.constructor = Game.GameObject;

Game.GameObject.prototype.update = function (delta) {
    for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof Game.GameObject) {
            if (this.children[i].visible) {
                this.children[i].update(delta);
            }
        }
    }
}
