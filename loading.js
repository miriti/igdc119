Game.Loading = function () {
    Game.State.call(this);

    var text = new PIXI.Text("Loading...", {font: "bold 30px monospace", fill: "#fff"});

    text.x = -text.width / 2;

    this.addChild(text);
};

Game.Loading.prototype = Object.create(Game.State.prototype);
Game.Loading.prototype.constructor = Game.Loading;