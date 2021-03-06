Game.Input = {
    Keys: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE_BREAK: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        N_0: 48,
        N_1: 49,
        N_2: 50,
        N_3: 51,
        N_4: 52,
        N_5: 53,
        N_6: 54,
        N_7: 55,
        N_8: 56,
        N_9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        LEFT_WINDOW_KEY: 91,
        RIGHT_WINDOW_KEY: 92,
        SELECT_KEY: 93,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBTRACT: 109,
        DECIMAL_POINT: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        SEMICOLON: 186,
        EQUAL_SIGN: 187,
        COMMA: 188,
        DASH: 189,
        PERIOD: 190,
        FORWARD_SLASH: 191,
        GRAVE_ACCENT: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRAKET: 221,
        SINGLE_QUOTE: 222
    },
    pressedKeys: new Array(256),
    keyReactions: new Array(256),
    isLeft: function () {
        if (this.pressedKeys[this.Keys.LEFT_ARROW] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.LEFT_ARROW];

        if (this.pressedKeys[this.Keys.A] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.A];

        return false;
    },
    isRight: function () {
        if (this.pressedKeys[this.Keys.RIGHT_ARROW] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.RIGHT_ARROW];

        if (this.pressedKeys[this.Keys.D] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.D];

        return false;
    },
    isUp: function () {
        if (this.pressedKeys[this.Keys.UP_ARROW] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.UP_ARROW];

        if (this.pressedKeys[this.Keys.W] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.W];

        return false;
    },
    isDown: function () {
        if (this.pressedKeys[this.Keys.DOWN_ARROW] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.DOWN_ARROW];

        if (this.pressedKeys[this.Keys.S] != null)
            return new Date().getTime() - this.pressedKeys[this.Keys.S];

        return false;
    },
    /**
     * Keydown
     *
     * @param e
     */
    keydown: function (e) {
        if (this.pressedKeys[e.keyCode] == null) {
            this.pressedKeys[e.keyCode] = new Date().getTime();
        }

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

        if (Game.StateControll.currentState != null) {
            Game.StateControll.currentState.keydown(e);
        }
    },
    /**
     * Key up
     *
     * @param e
     */
    keyup: function (e) {
        this.pressedKeys[e.keyCode] = null;
        if (Game.StateControll.currentState != null) {
            Game.StateControll.currentState.keyup(e);
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