Game.Particle = function (texture) {
    PIXI.Sprite.call(this, texture);

    this.anchor.set(0.5, 0.5);
    this.lifeTime = 0.5;

    this._life = 0;

    this.velocity = new Game.Vector2();
    this.initialScale = 0.1;
    this.finalScale = 1.0;

    this.initialAlpha = 1.0;
    this.finalAlpha = 0.0;
};

Game.Particle.prototype = Object.create(PIXI.Sprite.prototype);
Game.Particle.prototype.constructor = Game.Particle;

Game.Particle.prototype.update = function (delta) {
    this.x += this.velocity.x * delta;
    this.y += this.velocity.y * delta;

    if (this._life >= this.lifeTime) {
        this.parent.removeChild(this);
    } else {
        var lf = this._life / this.lifeTime;
        var scale = this.initialScale + (this.finalScale - this.initialScale) * lf;
        var alpha = this.initialAlpha + (this.finalAlpha - this.initialAlpha) * lf;

        this.scale.set(scale, scale);
        this.alpha = alpha;

        this._life += delta;
    }
};

Game.ParticleEngine = function () {
    PIXI.SpriteBatch.call(this);
};

Game.ParticleEngine.prototype = Object.create(PIXI.SpriteBatch.prototype);
Game.ParticleEngine.prototype.constructor = Game.ParticleEngine;

Game.ParticleEngine.prototype.update = function (delta) {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].update(delta);
    }
};