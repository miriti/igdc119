MenuItem = function (caption, action) {
    PIXI.DisplayObjectContainer.call(this);

    this.caption = caption;

    var text = new PIXI.Text(caption, this.defaultStyle);
    text.x = -text.width / 2;
    this.addChild(text);

    this.interactive = true;
    this.buttonMode = true;

    this.click = function () {
        if (typeof action === 'function') {
            action.call();
        }
    };

    (function (item) {
        item.mouseover = function () {
            text.setStyle(item.hoverStyle);
        };

        item.mouseout = function () {
            text.setStyle(item.defaultStyle);
        };
    })(this);
};

MenuItem.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.defaultStyle = {font: "bold 40px monospace", fill: '#aaa'};
MenuItem.prototype.hoverStyle = {font: "bold 40px monospace", fill: '#fff'};

MenuMain = function () {
    GameState.call(this);

    /** Background **/
    this.spaceBack = new PIXI.Sprite(GameResources.textures.space);
    this.addChild(this.spaceBack);

    /** Planet **/
    this.planet = new PIXI.Sprite(GameResources.textures.planet);
    this.planet.pivot.set(this.planet.width / 2, this.planet.height / 2);
    this.planet.scale.set(1.2, 1.2);
    this.planet.position.set(400, 300);
    this.addChild(this.planet);

    /** Menu items **/
    this.initItems([new MenuItem("New Game", function () {
        GameStateControll.setCurrentState(new GameMain());
    }), new MenuItem("Options", function () {
        console.log("Options");
    }), new MenuItem("Credits", function () {
        console.log("Credits");
    })]);
};

MenuMain.prototype = Object.create(GameState.prototype);
MenuMain.prototype.constructor = MenuMain;

MenuMain.prototype.items = null;

MenuMain.prototype.initItems = function (items) {
    this.items = items;

    (function (c) {
        var margin = 5;
        var top = 0;
        for (var i in items) {
            items[i].y = top;
            top += (items[i].height + margin);
            c.addChild(items[i]);
        }
    })(this.itemsContainer = new PIXI.DisplayObjectContainer());
    this.addChild(this.itemsContainer);
};

MenuMain.prototype.resize = function (newWidth, newHeight) {
    this.spaceBack.width = this.spaceBack.height = newWidth;
    this.spaceBack.x = -newWidth / 2;
    this.spaceBack.y = -newHeight / 2;

    this.itemsContainer.x = -this.itemsContainer.width;
    this.itemsContainer.y = -this.itemsContainer.height / 2;
};

MenuMain.prototype.update = function (delta) {
    this.planet.rotation += delta / 200;
};