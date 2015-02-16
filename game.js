(function () {
    /**
     * The Game
     *
     * @type {{fps: number, stage: PIXI.Stage, fpsText: PIXI.Text, init: Function, resize: Function, update: Function, updateFPSInfo: Function}}
     */
    var Game = {
        fps: 0,
        stage: new PIXI.Stage(0x0),
        fpsText: new PIXI.Text("FPS: 0", {fill: '#fff', font: '10px monospace'}),
        init: function () {
            var canvas = document.getElementById('canvas');

            this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
                view: canvas,
                antialias: false
            });

            this.stage.addChild(GameStateControll.stateContainer);
            GameStateControll.setCurrentState(new GameMain());

            this.stage.addChild(this.fpsText);
        },
        resize: function (newWidth, newHeight) {
            this.renderer.resize(newWidth, newHeight);
        },
        update: function (delta) {
            GameStateControll.update(delta);
            this.renderer.render(this.stage);
        },
        updateFPSInfo: function (currentFPS) {
            this.fps = currentFPS;
            this.fpsText.setText("FPS: " + this.fps);
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
        Game.updateFPSInfo(frames);
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
            frames++;
            lastTime = currentTime;
            requestAnimationFrame(updateGame);
        });
    }

    updateGame();

    /**
     * Handle window resize
     */
    window.onresize = function () {
        Game.resize(window.innerWidth, window.innerHeight);
    }
})();
