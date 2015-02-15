function Ball() {
    this.initCircle(30 + Math.random() * 100, 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')');
    this.vector = {
        x: -100 + Math.random() * 200,
        y: -100 + Math.random() * 200
    }
}

Ball.prototype = Object.create(Circle.prototype);

Ball.prototype.update = function (delta) {
    this.x += this.vector.x * delta;
    this.y += this.vector.y * delta;

    if (this.x > 960 - this.radius) {
        this.x = 960 - this.radius;
        this.vector.x *= -1;
    }

    if (this.x < -960 + this.radius) {
        this.x = -960 + this.radius;
        this.vector.x *= -1;
    }

    if (this.y < -540 + this.radius) {
        this.y = -540 + this.radius;
        this.vector.y *= -1;
    }

    if (this.y > 540 - this.radius) {
        this.y = 540 - this.radius;
        this.vector.y *= -1;
    }
};

(function () {
    var Game = {
        fps: 0,
        stage: new Stage(),
        tf: new TextField("FPS: ??"),
        init: function () {
            for (var i = 0; i < 500; i++) {
                var b = new Ball();
                b.setPosition(-960 + 1920 * Math.random(), -540 + 1080 * Math.random());
                this.stage.addChild(b);
            }

            this.tf.observe(this, 'fps');
            this.stage.addChild(this.tf.setPosition(-960, -500));
        },
        update: function (delta) {
            this.stage.update(delta);
        },
        updateFPSInfo: function (currentFPS) {
            this.fps = "FPS: " + currentFPS;
        }
    };

    Game.init();

    var lastTime = new Date().getTime();
    var frames = 0;

    setInterval(function () {
        Game.updateFPSInfo(frames);
        frames = 0;
    }, 1000);

    function updateGame() {
        var currentTime = new Date().getTime();

        setTimeout(function () {
            requestAnimationFrame(function () {
                var delta = ((currentTime - lastTime) == 0 ? 1 : (currentTime - lastTime)) / 1000;

                if (delta > 1) delta = 1;

                Game.update(delta);
                frames++;
                lastTime = currentTime;
                requestAnimationFrame(updateGame);
            });
        }, 1000 / 60);
    }

    updateGame();
})();
