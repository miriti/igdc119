(function () {
    var Game = {
        fps: 0,
        stage: new PIXI.Stage(0x0, true),
        init: function () {

            this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight);

            document.getElementById('container').appendChild(this.renderer.view);

            GameResources.load();

            this.stage.addChild(GameStateControll.stateContainer);
            GameStateControll.resize(innerWidth, innerHeight);
            GameStateControll.setCurrentState(new MenuMain());
        },
        update: function (delta) {
            GameStateControll.update(delta);
        },
        render: function () {
            this.renderer.render(this.stage);
        },
        resize: function (newWidth, newHeight) {
            this.renderer.resize(newWidth, newHeight);
            GameStateControll.resize(newWidth, newHeight);
        },
        updateFps: function (newFPS) {
            this.fps = newFPS;
        }
    };

    // Init The Game
    Game.init();

    /**
     * Measure FPS
     */
    var lastTime = new Date().getTime();
    var frames = 0;

    setInterval(function () {
        Game.updateFps(frames);
        frames = 0;
    }, 1000);

    /**
     * Main Loop
     */
    function updateGame() {
        var currentTime = new Date().getTime();

        requestAnimationFrame(function () {
            var delta = ((currentTime - lastTime) == 0 ? 1 : (currentTime - lastTime)) / 1000;

            if (delta > 1) delta = 1;

            Game.update(delta);
            Game.render();
            frames++;
            lastTime = currentTime;
            updateGame();
        });
    }

    updateGame();

    window.onresize = function () {
        Game.resize(innerWidth, innerHeight);
    }
})();
