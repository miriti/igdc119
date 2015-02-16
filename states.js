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

/**
 * Game State Controll
 *
 * @type {{stateContainer: PIXI.DisplayObjectContainer, currentState: null, setCurrentState: Function, update: Function}}
 */
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
    update: function (delta) {
        if (this.currentState != null) {
            this.currentState.update(delta);
        }
    }
};