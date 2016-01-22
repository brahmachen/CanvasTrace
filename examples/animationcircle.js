/**
 * @author nikai (@胖嘟嘟的骨头, nikai@baidu.com)
 */

var canvasLayer = new CanvasLayer({
    map: map,
    update: update
});

var ctx = canvasLayer.canvas.getContext("2d");

var backDom = document.createElement('canvas');
var backCtx = backDom.getContext('2d');
backDom.width = ctx.canvas.width;
backDom.height = ctx.canvas.height;
backCtx.globalAlpha = 0.85; //关键
backCtx.globalCompositeOperation = 'copy';

var markers = [];

function update() {
    if (!ctx) {
        return;
    }

    backCtx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var i = 0; i < markers.length; i++) {
        markers[i].draw();
    }

    ctx.drawImage(backDom, 0, 0, backDom.width, backDom.height);

}


function Marker(options) {
    this.options = options;
    this.size = options.size || 15;
    this._size = this.size * Math.random();
    this.location = options.location;
}

Marker.prototype.draw = function () {
    
    var pixel = map.pointToPixel(this.location);

    ctx.beginPath();
    ctx.arc(pixel.x, pixel.y, this._size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = this.options.color || 'rgba(200, 200, 50, 1)';
    ctx.lineWidth = 3;
    ctx.stroke();
    this._size += 0.8;
    if (this._size > this.size) {
        this._size = 0;
    }
}

Marker.prototype.dispose = function () {
}

function animateAction() {
    update();
}

function animate() {
    animateAction();
    setTimeout(arguments.callee, 60);
};

animate();

function addMarker(marker) {
    markers.push(marker);
}

addMarker(new Marker({
    location: new BMap.Point(116.405706, 39.927773),
    size: 25,
    color: 'rgba(250, 250, 50, 1)'
}));
