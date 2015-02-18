Loading = function () {
    GameState.call(this);

    var text = new PIXI.Text("Loading...", {font: "bold 30px monospace", fill: "#fff"});

    text.x = -text.width / 2;

    this.addChild(text);
};

Loading.prototype = Object.create(GameState.prototype);
Loading.prototype.constructor = Loading;