(function () {
    /**
     * The Game
     *
     * @type {{fps: number, stage: PIXI.Stage, fpsText: PIXI.Text, init: Function, resize: Function, update: Function, updateFPSInfo: Function}}
     */
    var Game = {
        fps: 0,
        stage: new PIXI.Stage(0x0, true),
        init: function () {

            this.renderer = PIXI.autoDetectRenderer(800, 600);

            document.getElementById('container').appendChild(this.renderer.view);

            //this.stage.addChild(GameStateControll.stateContainer);
            //GameStateControll.resize(1024, 576);
            //GameStateControll.setCurrentState(new MenuMain());
        },
        update: function (delta) {
            GameStateControll.update(delta);
        },
        render: function () {
            this.renderer.render(this.stage);
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
        document.getElementsByTagName('p')[0].innerHTML = 'FPS: ' + frames;
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

            //Game.update(delta);
            Game.render();
            frames++;
            lastTime = currentTime;
            requestAnimationFrame(updateGame);
        });
    }

    updateGame();
})();
