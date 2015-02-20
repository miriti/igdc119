Game = {
        fps: 0,
    stage: new PIXI.Stage(0x0),
    paused: false,
        start: function () {

            this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight);

            document.getElementById('container').appendChild(this.renderer.view);

            this.stage.addChild(Game.StateControll.stateContainer);

            Game.StateControll.setCurrentState(new Game.Loading());
            Game.StateControll.resize(innerWidth, innerHeight);

            Game.GameResources.load(function () {
                Game.StateControll.setCurrentState(new Game.MenuMain());
            });

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

                    if (!this.paused) {
                        Game.update(delta);
                    }

                    Game.render();
                    frames++;
                    lastTime = currentTime;
                    updateGame();
                });
            }

            updateGame();

            window.onkeydown = function (e) {
                Game.Input.keydown(e);
            };

            window.onkeyup = function (e) {
                Game.Input.keyup(e);
            };

            window.onresize = function () {
                Game.resize(innerWidth, innerHeight);
            };

            window.onblur = function () {
                // TODO Pause
            };
        },
        update: function (delta) {
            Game.StateControll.update(delta);
        },
        render: function () {
            this.renderer.render(this.stage);
        },
        resize: function (newWidth, newHeight) {
            this.renderer.resize(newWidth, newHeight);
            Game.StateControll.resize(newWidth, newHeight);
        },
        updateFps: function (newFPS) {
            this.fps = newFPS;
        }
    };
