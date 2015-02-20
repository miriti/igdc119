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

    this.addChild(new Game.Planet());

    this.player = new Game.Player();
    this.player.position.set(700, 100);
    this.addChild(this.player);
    this.addChild(this.player.trail);

    this.setZoom(1);

    this.focusedPlanet = null;
};

Game.Main.prototype = Object.create(Game.State.prototype);
Game.Main.prototype.constructor = Game.Main;

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
 * Focus camera on a player
 *
 * @param planet
 */
Game.Main.prototype.focusOnAPlanet = function (planet) {
    if (planet != this.focusedPlanet) {
        this.focusedPlanet = planet;

        if (planet !== null) {
            // TODO Focus on a planet animation
        } else {
            // Cancel focusing
        }
    }
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
    Game.GameObject.prototype.update.call(this, delta);

    for (var i in Game.Gravity.objects) {
        var o = Game.Gravity.objects[i];
        if ((o.static) && (o instanceof Game.Planet)) {
            var v = new Game.Vector2(o.x - this.player.x, o.y - this.player.y);
            if (v.len() - o.radius < 200) {
                this.setZoom(3, 5);
                this.focusOnAPlanet(o);
            }
        }
    }

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
