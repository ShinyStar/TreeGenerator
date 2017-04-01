///////////////////////
///TREEEES! :D///
///////////////////////

function createTree(initialW, initialH) {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // var iterations = document.getElementById("iterations").value;

    var x = 500, y = 800, w = initialW, h = initialH;

    drawTree(ctx, x, y, w, h, 0, 0, 3);

}

function drawTree(ctx, x, y, w, h, rotation, i, iterations) {
    if (i == iterations) { return; }
    ctx.save();
    ctx.translate(x, y);

    ctx.rotate(rotation * Math.PI / 180);
    drawTriangle(ctx, 0, 0, w, h);
    lineTriangle(ctx, 0, 0, w, h, "black");

    var times = rand(3, 9);
    for (var j = 0; j < times; j++) {
        drawTree(ctx, 0, rand(-h / 3 * 2, -h / 2), rand(w / 4, w / 2), rand(h / 4, h / 2), rand(0, 90), i + 1, iterations);
        drawTree(ctx, 0, rand(-h / 3 * 2, -h / 2), rand(w / 4, w / 2), rand(h / 4, h / 2), rand(270, 360), i + 1, iterations);
    }

    if (i != 0) {
        drawLeaves(ctx, 0, 0, -h, 50, 50);
        drawLeaves(ctx, 0, 0, -h, 50, 50);
        drawLeaves(ctx, 0, 0, -h, 50, 50);
        drawLeaves(ctx, 0, -h, -h / 2, 50, 50);
        drawLeaves(ctx, 0, -h, -h / 2, 50, 50);
    } else {
        if (Math.random() > 0.3) {
            var holes = new Image();
            holes.src = "treeholes.png";
            ctx.drawImage(holes, rand(0, 3) * 50, 0, 50, 50, -25, rand(-h / 2, -50), 50, 50);
        }
    }
    drawLeaves(ctx, 0, -h / 5 * 4, -h / 5 * 2, 50, 50);
    drawLeaves(ctx, 0, -h / 2, -h / 2, 50, 50);

    ctx.restore();

}

function drawLeaves(ctx, x, y1, y2, w, h) {
    for (var i = 0; i < 10; i++) {
        var y = rand(y1, y2);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rand(0, 360) * Math.PI / 180);
        drawLeave(ctx, 0, 0, rand(w / 2, w), rand(h / 2, h));
        ctx.restore();
    }
}

function drawTriangle(ctx, x, y, w, h) { //x,y on center of bottom side of triangle placed like this /_\
    var bark = new Image();
    bark.src = "wood.png";
    ctx.fillStyle = ctx.createPattern(bark, "repeat");
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y);
    ctx.lineTo(x + w / 2, y);
    ctx.lineTo(x, y - h);
    ctx.closePath();
    ctx.fill();
}

function lineTriangle(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y);
    ctx.lineTo(x + w / 2, y);
    ctx.lineTo(x, y - h);
    ctx.closePath();
    ctx.stroke();
}

function drawLeave(ctx, x, y, w, h) {
    var leaves = new Image();
    leaves.src = "leaves.png";
    ctx.drawImage(leaves, 0, 0, 50, 50, x, y, w, h);
}

function rand(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
}