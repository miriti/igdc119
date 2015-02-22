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
 * Mirror the velocity
 *
 * @returns {Game.Vector2}
 */
Game.Vector2.prototype.mirror = function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
}

/**
 * Limit velocity length
 *
 * @param len
 * @returns {Vector2}
 */
Game.Vector2.prototype.lim = function (len) {
    var len = len || 1;
    var clen = this.len() || 1;

    if (clen != 0) {
        this.x = (this.x / clen) * len;
        this.y = (this.y / clen) * len;
    }
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
    if ((x instanceof Game.Vector2) && (typeof y === 'undefined')) {
        this.x += x.x;
        this.y += x.y;
    } else {
        this.x += x;
        this.y += y;
    }
    return this;
};

Game.Vector2.prototype.lengthen = function (by) {
    this.lim(this.len() + by);
};

Game.Vector2.prototype.set = function (x, y) {
    PIXI.Point.prototype.set.call(this, x, y);
    return this;
};

/**
 * Turning a vectory. Bydlocode style
 *
 * @param rad
 * @returns {Game.Vector2}
 */
Game.Vector2.prototype.turn = function (rad) {
    if (this.len2() != 0) {
        var cur = Math.atan2(this.y, this.x);
        var l = this.len();
        cur += rad;
        this.x = Math.cos(cur) * l;
        this.y = Math.sin(cur) * l;
    }
    return this;
};

Game.Vector2.prototype.dist2 = function (x1, y1, x2, y2) {
    var k1 = x2 - x1;
    var k2 = y2 - y1;

    return (k1 * k1) + (k2 * k2);
};

Game.Vector2.prototype.dist = function (x1, y1, x2, y2) {
    return Math.sqrt(this.dist2(x1, y1, x2, y2));
};