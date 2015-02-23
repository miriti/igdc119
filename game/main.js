Game.mainInstance = null;

/**
 * Main game unit
 *
 * @constructor
 */
Game.Main = function () {
    Game.State.call(this);

    if (Game.StateControll.currentState instanceof  Game.MenuMain) {
        var newGame = this;

        for (var i = Game.StateControll.currentState.items.length - 1; i >= 0; i--) {
            if (Game.StateControll.currentState.items[i].caption == "Resume Game") {
                delete  Game.StateControll.currentState.items[i];
            }
        }

        Game.StateControll.currentState.items.splice(0, 0, new Game.MenuItem("Resume Game", function () {
            Game.StateControll.setCurrentState(newGame);
        }));

        Game.StateControll.currentState.initItems(Game.StateControll.currentState.items);
    }

    this.world = new p2.World({
        gravity: [0, 0]
    });

    this.addPhysicsObject(new Game.Planet());

    this.player = new Game.Player(10, -800);

    this.addPhysicsObject(this.player);

    this.setZoom(1);

    this.focusedPlanet = null;

    this.particlesContainer = new Game.ParticleEngine();

    this.addChild(this.particlesContainer);

    Game.mainInstance = this;
};

Game.Main.prototype = Object.create(Game.State.prototype);
Game.Main.prototype.constructor = Game.Main;

/**
 * Add a physics object to the world
 *
 * @param phObj
 */
Game.Main.prototype.addPhysicsObject = function (phObj) {
    this.addChild(phObj);
    phObj.inject(this.world);
};

/**
 * Set zoom
 *
 * @param zoom
 */
Game.Main.prototype.setZoom = function (zoom, time) {
    if (this._zoom != zoom) {
        time = time || 2;
        TweenLite.killTweensOf(this.scale);
        TweenLite.to(this.scale, time, {x: zoom, y: zoom});

        this._zoom = zoom;
    }
};

/**
 * Get zoom
 *
 * @returns {*}
 */
Game.Main.prototype.getZoom = function () {
    return this._zoom;
};

/**
 * Follow the object
 *
 * @param target
 */
Game.Main.prototype.cameraFollows = function (target) {
    this.x = -target.x * this.scale.x;
    this.y = -target.y * this.scale.y;
};

/**
 * Update game state
 *
 * @param delta
 */
Game.Main.prototype.update = function (delta) {
    this.world.step(1 / 60, delta);

    Game.GameObject.prototype.update.call(this, delta);

    if (this.focusedPlanet == null) {
        this.cameraFollows(this.player);
    }
};

/**
 * Key down event
 *
 * @param e
 */
Game.Main.prototype.keydown = function (e) {
    if (e.keyCode == Game.Input.Keys.ESCAPE) {
        Game.StateControll.popState();
    }

    if (e.keyCode == Game.Input.Keys.OPEN_BRACKET) {
        this.setZoom(this.getZoom() * 0.5);
    }

    if (e.keyCode == Game.Input.Keys.CLOSE_BRAKET) {
        this.setZoom(this.getZoom() * 2);
    }
};
