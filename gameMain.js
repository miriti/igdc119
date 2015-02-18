GameMain = function () {
    GameState.call(this);

    if (GameStateControll.currentState instanceof MenuMain) {
        var newGame = this;

        for (var i = GameStateControll.currentState.items.length - 1; i >= 0; i--) {
            if (GameStateControll.currentState.items[i].caption == "Resume Game") {
                delete GameStateControll.currentState.items[i];
            }
        }

        GameStateControll.currentState.items.splice(0, 0, new MenuItem("Resume Game", function () {
            GameStateControll.setCurrentState(newGame);
        }));

        GameStateControll.currentState.initItems(GameStateControll.currentState.items);
    }
};

GameMain.prototype = Object.create(GameState.prototype);
GameMain.prototype.constructor = GameMain;

GameMain.prototype.keydown = function (e) {
    GameStateControll.popState();
};
