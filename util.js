Game.Vector2 = function (x, y) {
    PIXI.Point.call(this, x, y);
};

Game.Vector2.prototype = Object.create(PIXI.Point.prototype);
Game.Vector2.prototype.constructor = Game.Vector2;

/**
 * Vector length without taking a square root
 *
 * @returns {number}
 */
Game.Vector2.prototype.len2 = function () {
    return (this.x * this.x) + (this.y * this.y);
};

/**
 * Vector length
 *
 * @returns {number}
 */
Game.Vector2.prototype.len = function () {
    return Math.sqrt(this.len2());
};

/**
 * Limit vector length
 *
 * @param len
 * @returns {Vector2}
 */
Game.Vector2.prototype.lim = function (len) {
    var len = len || 1;
    var clen = this.len();

    this.x = (this.x / clen) * len;
    this.y = (this.y / clen) * len;
    return this;
};

/**
 * Generate Vector2 from PIXI.Point
 *
 * @param pixiPoint PIXI.Point
 * @returns {Game.Vector2}
 */
Game.Vector2.prototype.fromPixiPoint = function (pixiPoint) {
    this.x = pixiPoint.x;
    this.y = pixiPoint.y;
    return this;
};

/**
 * Add
 *
 * @param x
 * @param y
 */
Game.Vector2.prototype.add = function (x, y) {
    this.x += x;
    this.y += y;
    return this;
};

Game.Vector2.prototype.lengthen = function (by) {
    this.lim(this.len() + by);
};

Game.Vector2.prototype.set = function (x, y) {
    PIXI.Point.prototype.set.call(this, x, y);
    return this;
}

echo = trace = function () {
    console.log.apply(console, Array.prototype.slice.call(arguments));
};