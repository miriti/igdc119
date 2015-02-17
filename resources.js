GameResources = {
    basePath: 'data',
    texturesFiles: ['planet.png', 'space.jpg'],
    textures: {},

    t: function (id) {
        return this.textures[id];
    },

    load: function (callback) {
        for (var i in this.texturesFiles) {
            var fname = this.texturesFiles[i];
            var id = (function () {
                var parts = fname.split('.');
                parts.pop();
                return parts.join('.');
            })();
            this.textures[id] = PIXI.Texture.fromImage(this.basePath + '/textures/' + fname);
            console.log("Texure:", this.basePath + '/textures/' + fname, 'ID', id);
        }
    }
};

R = GameResources;