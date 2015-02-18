Keys = {
    ESC: 27
};

GameInput = {
    pressedKeys: new Array(256),
    keyReactions: new Array(256),
    /**
     * Keydown
     *
     * @param e
     */
    keydown: function (e) {
        this.pressedKeys[e.keyCode] = new Date().getTime();

        if (typeof this.keyReactions[e.keyCode] !== 'undefined') {
            for (var i = this.keyReactions[e.keyCode].length; i >= 0; i--) {
                var r = this.keyReactions[e.keyCode][i];
                if (r != null) {
                    r.callback.call();
                    if (r.singletime) {
                        delete this.keyReactions[e.keyCode][i];
                    }
                }
            }
        }

        if (GameStateControll.currentState != null) {
            GameStateControll.currentState.keydown(e);
        }
    },
    /**
     * Key up
     *
     * @param e
     */
    keyup: function (e) {
        this.pressedKeys[e.keyCode] = null;
        if (GameStateControll.currentState != null) {
            GameStateControll.currentState.keyup(e);
        }
    },
    addKeyReaction: function (keyCode, callback, singletime) {
        if (typeof this.keyReactions[keyCode] === 'undefined') {
            this.keyReactions[keyCode] = [];
        }

        this.keyReactions[keyCode].push({
            callback: callback,
            singletime: singletime
        });
    }
};