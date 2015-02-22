Game.gameObjects = [];

Game.GameObject = function () {
    PIXI.DisplayObjectContainer.call(this);
    Game.gameObjects.push(this);
};

Game.GameObject.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Game.GameObject.prototype.constructor = Game.GameObject;

Game.GameObject.prototype.destroy = function () {
    var index;

    if ((index = Game.gameObjects.indexOf(this)) !== -1) {
        delete  Game.gameObjects[index];
    }

};

Game.GameObject.prototype.update = function (delta) {
    for (var i = 0; i < this.children.length; i++) {
        if (typeof this.children[i].update === 'function') {
            if (this.children[i].visible) {
                this.children[i].update(delta);
            }
        }
    }
}
