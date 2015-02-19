Game.GameMain = function () {
    Game.GameState.call(this);

    if (Game.GameStateControll.currentState instanceof  Game.MenuMain) {
        var newGame = this;

        for (var i = Game.GameStateControll.currentState.items.length - 1; i >= 0; i--) {
            if (Game.GameStateControll.currentState.items[i].caption == "Resume Game") {
                delete  Game.GameStateControll.currentState.items[i];
            }
        }

        Game.GameStateControll.currentState.items.splice(0, 0, new Game.MenuItem("Resume Game", function () {
            Game.GameStateControll.setCurrentState(newGame);
        }));

        Game.GameStateControll.currentState.initItems(Game.GameStateControll.currentState.items);
    }
};

Game.GameMain.prototype = Object.create(Game.GameState.prototype);
Game.GameMain.prototype.constructor = Game.GameMain;

Game.GameMain.prototype.keydown = function (e) {
    if (e.keyCode == Game.GameInput.Keys.ESCAPE) {
        Game.GameStateControll.popState();
    }
};
