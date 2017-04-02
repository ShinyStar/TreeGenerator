///////////////////////
///TREEEES! :D///
///////////////////////

function createTree(initialW, initialH) {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x = 900, y = 800, w = initialW, h = initialH;
    var types = [];
    var colors = [];

    for(var i=0;i<7;i++){
        if(document.getElementById("t"+i).checked){
            types.push(i);
        }
    }
    for(i=0;i<7;i++){
        if(document.getElementById("c"+i).checked){
            colors.push(i);
        }
    }
    if(colors.length==0){
        colors.push(0);
    }

    var barkcolors = ["#834a23","#522b10", "#1a0e05", "#1b1a19", "#797471", "#e3dbd5", "#f8b383", "#c5c782", "#435864"];
    var barkcolor1 = barkcolors[rand(0, barkcolors.length-1)];
    var barkcolor2 = barkcolors[rand(0, barkcolors.length-1)];

    var barkType = "woods/wood"+rand(1,5)+".png";

    drawTree(ctx, x, y, w, h, 0, 0, 3, types, colors, barkcolor1, barkcolor2, barkType);

}

function drawTree(ctx, x, y, w, h, rotation, i, iterations, types, colors, barkcolor1, barkcolor2, barkType) {
    if (i == iterations) { return; }
    ctx.save();
    ctx.translate(x, y);

    ctx.rotate(rotation * Math.PI / 180);
    gradientTriangle(ctx, 0, 0, w, h, barkcolor1, barkcolor2);
    drawTriangle(ctx, 0, 0, w, h, barkType);
    lineTriangle(ctx, 0, 0, w, h, "black");

    var times = rand(3, 9);
    for (var j = 0; j < times; j++) {
        drawTree(ctx, 0, rand(-h / 3 * 2, -h / 2), rand(w / 4, w / 2), rand(h / 4, h / 2), rand(0, 90), i + 1, iterations, types, colors, barkcolor1, barkcolor2, barkType);
        drawTree(ctx, 0, rand(-h / 3 * 2, -h / 2), rand(w / 4, w / 2), rand(h / 4, h / 2), rand(270, 360), i + 1, iterations, types, colors, barkcolor1, barkcolor2, barkType);
    }

    if (i != 0) {
        drawLeaves(ctx, 0, 0, -h, 50, 50, types, colors);
        drawLeaves(ctx, 0, 0, -h, 50, 50, types, colors);
        drawLeaves(ctx, 0, 0, -h, 50, 50, types, colors);
        drawLeaves(ctx, 0, -h, -h / 2, 50, 50, types, colors);
        drawLeaves(ctx, 0, -h, -h / 2, 50, 50, types, colors);
    } else {
        while (Math.random() > 0.4) {
            var holes = new Image();
            holes.src = "treeholes.png";
            ctx.drawImage(holes, rand(0, 3) * 50, rand(0, 3) * 50, 50, 50, -25, rand(-h / 2, -50), 50, 50);
        }
    }
    drawLeaves(ctx, 0, -h / 5 * 4, -h / 5 * 2, 50, 50, types, colors);
    drawLeaves(ctx, 0, -h / 2, -h / 2, 50, 50, types, colors);

    ctx.restore();

}

function drawLeaves(ctx, x, y1, y2, w, h, types, colors) {
    for (var i = 0; i < 10; i++) {
        var y = rand(y1, y2);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rand(0, 360) * Math.PI / 180);
        var type = types[rand(0,types.length-1)];
        var color = colors[rand(0,colors.length-1)];
        drawLeave(ctx, 0, 0, rand(w / 2, w), rand(h / 2, h), type, color);
        ctx.restore();
    }
}

function drawTriangle(ctx, x, y, w, h, barkType) { //x,y on center of bottom side of triangle placed like this /_\
    var bark = new Image();
    bark.src = barkType;
    ctx.fillStyle = ctx.createPattern(bark, "repeat");
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y);
    ctx.lineTo(x + w / 2, y);
    ctx.lineTo(x, y - h);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
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

function gradientTriangle(ctx, x, y, w, h, barkcolor1, barkcolor2) {    
    var gradient = ctx.createLinearGradient(x,y,x,y-h);
    gradient.addColorStop(0,barkcolor1);
    gradient.addColorStop(1,barkcolor2);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y);
    ctx.lineTo(x + w / 2, y);
    ctx.lineTo(x, y - h);
    ctx.closePath();
    ctx.fill();
}

function drawLeave(ctx, x, y, w, h, type, color) {
    var leaves = new Image();
    leaves.src = "leaves.png";
    ctx.drawImage(leaves, 50*color, 50*3*type+50*rand(0,2), 50, 50, x, y, w, h);
}

function rand(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
}