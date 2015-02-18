GameObject = function () {
    PIXI.DisplayObjectContainer.call(this);
};

GameObject.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameObject.prototype.constructor = GameObject;

GameObject.prototype.update = function (delta) {
    for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof GameObject) {
            if (this.children[i].visible) {
                this.children[i].update(delta);
            }
        }
    }
}
