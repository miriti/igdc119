GameMain = function () {
    GameState.call(this);
};

GameMain.prototype = Object.create(GameState.prototype);
GameMain.prototype.constructor = GameMain;
