/**
 * Two-component Vector
 *
 * @param x
 * @param y
 * @constructor
 */
Game.Vector2 = function (x, y) {
    PIXI.Point.call(this, x, y);
};

Game.Vector2.prototype = Object.create(PIXI.Point.prototype);
Game.Vector2.prototype.constructor = Game.Vector2;

/**
 * The length of the vector without taking a square root
 *
 * @returns {number}
 */
Game.Vector2.prototype.len2 = function () {
    return (this.x * this.x) + (this.y * this.y);
};

/**
 * The length of the vector
 *
 * @returns {number}
 */
Game.Vector2.prototype.len = function () {
    return Math.sqrt(this.len2());
};

/**
 * Mirror the vector
 *
 * @returns {Game.Vector2}
 */
Game.Vector2.prototype.mirror = function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
}

/**
 * Limit the length of the vector
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
 * Multiply the vector by scalar value
 *
 * @param scalar
 * @returns {Game.Vector2}
 */
Game.Vector2.prototype.mult_scalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
};

/**
 * Add
 *
 * @param x {number|Vector2}
 * @param y {number|undefined}
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

/**
 * Lengthen the vector by scalar value
 *
 * @param by
 */
Game.Vector2.prototype.lengthen = function (by) {
    this.lim(this.len() + by);
};

/**
 * Set the components of the vector
 *
 * @param x
 * @param y
 * @returns {Game.Vector2}
 */
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

/**
 * Calculate distance between two points (without taking a square root)
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
Game.Vector2.prototype.dist2 = function (x1, y1, x2, y2) {
    var k1 = x2 - x1;
    var k2 = y2 - y1;

    return (k1 * k1) + (k2 * k2);
};

/**
 * Calculate distance between two points
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
Game.Vector2.prototype.dist = function (x1, y1, x2, y2) {
    return Math.sqrt(this.dist2(x1, y1, x2, y2));
};

/**
 * Angle between two vectors
 *
 * @param v1
 * @param v2
 */
Game.Vector2.prototype.angle = function (v1, v2) {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
};

/**
 * Dot product
 *
 * @param v1 {Game.Vector2}
 * @param v2 {Game.Vector2}
 */
Game.Vector2.prototype.dot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

Game.Vector2.prototype.toString = function () {
    return "x: " + this.x + " y: " + this.y;
};

Game.Vector2.prototype.clone = function () {
    return new Game.Vector2(this.x, this.y);
};