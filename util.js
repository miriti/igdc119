Vector2 = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector2.prototype.constructor = Vector2;

/**
 * Vector length without taking a square root
 *
 * @returns {number}
 */
Vector2.prototype.len2 = function () {
    return (this.x * this.x) + (this.y * this.y);
};

/**
 * Vector length
 *
 * @returns {number}
 */
Vector2.prototype.len = function () {
    return Math.sqrt(this.len2());
};

/**
 * Limit vector length
 *
 * @param len
 * @returns {Vector2}
 */
Vector2.prototype.lim = function (len) {
    var len = len || 1;
    var clen = this.len();

    this.x = (this.x / clen) * len;
    this.y = (this.y / clen) * len;
    return this;
};