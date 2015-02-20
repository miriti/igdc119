Game.Main = function () {
    Game.State.call(this);

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

    this.addChild(new Game.Planet());

    this.player = new Game.Player();
    this.player.position.set(500, 100);
    this.addChild(this.player);
    this.addChild(this.player.trail);
    this.scale.set(0.5, 0.5);
};

Game.Main.prototype = Object.create(Game.State.prototype);
Game.Main.prototype.constructor = Game.Main;

Game.Main.prototype.update = function (delta) {
    Game.GameObject.prototype.update.call(this, delta);
};

Game.Main.prototype.keydown = function (e) {
    if (e.keyCode == Game.Input.Keys.ESCAPE) {
        Game.GameStateControll.popState();
    }
};
