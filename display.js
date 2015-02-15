/**
 * DisplayObject
 *
 * @constructor
 */
function DisplayObject() {
}

DisplayObject.prototype = {
    x: 0,
    y: 0,
    width: null,
    height: null,
    rotation: 0,
    attrMap: {
        x: "x",
        y: "y",
        width: "width",
        height: "height"
    },
    innerMap: null,
    DOMElement: null,
    transform: function () {
        var translate = '';
        if (this.x != 0 || this.y != 0)
            translate = 'translate(' + this.x + ', ' + this.y + ')';

        var rotate = '';
        if (this.rotation != 0) {
            rotate = ' rotate(' + this.rotation + ', 0, 0)';
        }
        return translate + rotate;
    },
    setPosition: function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
    setSize: function (width, height) {
        this.width = width;
        this.height = height;
        return this;
    },
    updateDOM: function () {
        for (var k in this.attrMap) {
            if (this[k] != null) {
                var attrVal;

                if (typeof this[k] == "function") {
                    attrVal = this[k].apply(this);
                } else {
                    attrVal = this[k];
                }

                this.DOMElement.setAttribute(this.attrMap[k], attrVal);
            }
        }
        if (this.innerMap != null) {
            this.DOMElement.innerHTML = this[this.innerMap];
        }
    },
    update: function (delta) {

    }
}

/**
 * DisplayObjectContainer
 *
 * @constructor
 */
function DisplayObjectContainer() {
    this.DOMElement = document.createElementNS("http://www.w3.org/2000/svg", 'g');
}

DisplayObjectContainer.prototype = Object.create(DisplayObject.prototype);

DisplayObjectContainer.prototype.children = [];

DisplayObjectContainer.prototype.attrMap = {
    transform: 'transform'
};

/**
 * Add child to a DisplayObjectContainer
 *
 * @param child
 * @returns {DisplayObjectContainer}
 */
DisplayObjectContainer.prototype.addChild = function (child) {
    this.DOMElement.appendChild(child.DOMElement);
    this.children.push(child);
    return this;
}

/**
 * Remove child from a DisplayObjectContainer
 *
 * @param child
 * @returns {DisplayObjectContainer}
 */
DisplayObjectContainer.prototype.removeChild = function (child) {
    var index;
    if ((index = this.children.indexOf(child)) != -1) {
        this.children.splice(index, 1);
    }
    return this;
}

/**
 * Update a DisplayObjectContainer
 *
 * @param delta
 */
DisplayObjectContainer.prototype.update = function (delta) {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].update(delta);
        this.children[i].updateDOM();
    }
}

/**
 * Text fields
 *
 * @param text
 * @constructor
 */
function TextField(text) {
    this._observe_object = null;
    this._observe_field = null;
    this.text = text;
    this.DOMElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
}

TextField.prototype = Object.create(DisplayObject.prototype);

TextField.prototype.innerMap = "text";

TextField.prototype.attrMap = {x: "x", y: "y", style: "style"};

TextField.prototype.font = 'Arial';

TextField.prototype.fontSize = '30px';

TextField.prototype.style = function () {
    return "font-family: '" + this.font + "'; font-size: " + this.fontSize;
}

TextField.prototype.observe = function (obj, field) {
    this._observe_object = obj;
    this._observe_field = field;

    return this;
}

TextField.prototype.update = function (delta) {
    if ((this._observe_object != null) && (this._observe_field != null)) {
        this.text = this._observe_object[this._observe_field];
    }
}

/**
 * Create quad
 *
 * @param width
 * @param height
 * @param color
 * @constructor
 */
function Quad(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.DOMElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
}

Quad.prototype = Object.create(DisplayObject.prototype);

Quad.prototype.attrMap = {x: "x", y: "y", width: "width", height: "height", color: "fill"};

/**
 * Circle
 *
 * @param radius
 * @param color
 * @constructor
 */
function Circle(radius, color) {
    this.initCircle(radius, color);
}

Circle.prototype = Object.create(DisplayObject.prototype);

Circle.prototype.initCircle = function (radius, color) {
    this.radius = radius;
    this.color = color;
    this.DOMElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
}

Circle.prototype.attrMap = {x: "cx", y: "cy", radius: "r", color: "fill"};

/**
 * Stage
 *
 * @constructor
 */
function Stage() {
    this.children = [];
    var svgs = document.getElementsByTagName('svg');
    if (svgs.length != null) {
        this.DOMElement = svgs[0];
    } else {
        this.DOMElement = document.createElement('svg');
        document.appendChild(this.DOMElement);
    }
}

Stage.prototype = Object.create(DisplayObjectContainer.prototype);