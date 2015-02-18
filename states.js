/**
 * Game State
 *
 * @constructor
 */
GameState = function () {
    GameObject.call(this);
};

GameState.prototype = Object.create(GameObject.prototype);
GameState.prototype.constructor = GameState;

GameState.prototype.resize = function (newWidth, newHeight) {

};

GameState.prototype.keydown = function (e) {
};

GameState.prototype.keyup = function (e) {
};

GameStateControll = {
    stateContainer: new PIXI.DisplayObjectContainer(),
    currentState: null,
    currentWidth: 0,
    currentHeight: 0,
    history: [],
    setCurrentState: function (state) {
        if (this.currentState != null) {
            this.history.push(this.currentState);
            this.stateContainer.removeChild(this.currentState);
        }

        this.stateContainer.addChild(state);
        this.currentState = state;
        this.currentState.resize(this.currentWidth, this.currentHeight);
    },
    popState: function () {
        this.setCurrentState(this.history.pop());
    },
    resize: function (newWidth, newHeight) {
        this.currentWidth = newWidth;
        this.currentHeight = newHeight;

        this.stateContainer.x = newWidth / 2;
        this.stateContainer.y = newHeight / 2;

        if(this.currentState != null) {
            this.currentState.resize(newWidth, newHeight);
        }
    },
    update: function (delta) {
        if (this.currentState != null) {
            this.currentState.update(delta);
        }
    }
};