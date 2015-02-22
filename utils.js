Game.Utils = {
    circlePath: function (radius, segments) {
        segments = segments || 16;

        var result = [];
        var a = 0;

        while (a < Math.PI * 2) {
            result.push(new PIXI.Point(Math.cos(a) * radius, Math.sin(a) * radius));
            a += (Math.PI * 2) / segments;
        }

        return result;
    }
};

echo = trace = function () {
    console.log.apply(console, Array.prototype.slice.call(arguments));
};