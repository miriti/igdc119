Game.Resources = {
    files: {
        space: 'textures/space.jpg',
        planet: 'textures/planet.png',
        spark: 'textures/spark.png'
    },
    textures: {},
    load: function (callback) {

        var allResources = [];

        for (var id in this.files) {
            allResources.push('data/' + this.files[id]);
        }

        var pixiLoader = new PIXI.AssetLoader(allResources);
        pixiLoader.load();

        (function (R) {
            pixiLoader.onComplete = function () {
                for (var id in R.files) {
                    R.textures[id] = PIXI.Texture.fromImage('data/' + R.files[id]);
                }

                if (typeof callback === 'function') {
                    callback.call();
                }
            };
        })(this);
    }
};