MenuItem = function (caption) {
    PIXI.DisplayObjectContainer.call(this);

    var text = new PIXI.Text(caption, {font: "bold 50px monospace", fill: '#eee'});
    text.x = -text.width / 2;
    this.addChild(text);

    this.interactive = true;
    this.buttonMode = true;

    this.click = function () {
        this.onaction();
    };

    this.mouseover = function () {
        text.setStyle({font: "bold 60px monospace", fill: '#f00'});
        text.x = -text.width / 2;
    };

    this.mouseout = function () {
        text.setStyle({font: "bold 50px monospace", fill: '#fff'});
        text.x = -text.width / 2;
    };
};

MenuItem.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.onaction = function () {
};

MenuMain = function () {
    GameState.call(this);

    var startGame = new MenuItem("Start Game");
    startGame.onaction = function () {

    };
    this.addChild(startGame);
};

MenuMain.prototype = Object.create(GameState.prototype);
MenuMain.prototype.constructor = MenuMain;
