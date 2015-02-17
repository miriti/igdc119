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

GameStateControll = {
    stateContainer: new PIXI.DisplayObjectContainer(),
    currentState: null,
    setCurrentState: function (state) {
        if (this.currentState != null) {
            this.stateContainer.removeChild(this.currentState);
        }

        this.stateContainer.addChild(state);
        this.currentState = state;
    },
    resize: function (newWidth, newHeight) {
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