var canvas, ctx, windowWidth, windowHeight, canvasWidth, canvasHeight, i;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
ctx.my_prefs = {};

windowHeight = window.innerHeight;
windowWidth = window.innerWidth;

canvas.setAttribute("height", windowHeight - 100);
canvas.setAttribute("width", Math.floor(windowWidth / 2.5));

canvasHeight = canvas.getAttribute("height");
canvasWidth = canvas.getAttribute("width");

ctx.save();

ctx.fillStyle = 'black';

ctx.save()

ctx.fillRect(0, 0, canvasWidth, canvasHeight);

setInterval(function() {
	ctx.fillStyle = 'white';
	for (i = 0; i < 300; i ++) {
		ctx.beginPath();
		ctx.arc(30*i, 50 + getRandomInt(0, canvasHeight), 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
}, 250);

setInterval(function () {
	ctx.fillStyle = 'white';
	for (i = 0; i < 300; i ++) {
		ctx.beginPath();
		ctx.arc(30*i, 50 + getRandomInt(0, canvasHeight), 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	ctx.fillStyle = 'white';
	for (i = 0; i < 300; i ++) {
		ctx.beginPath();
		ctx.arc(30*i, 50 + getRandomInt(0, canvasHeight), 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
}, 3000);

function Player(boxHeight, boxWidth) {
    this.boxHeight = boxHeight;
    this.boxWidth = boxWidth;
    this.health = 10;    
    }

Player.prototype.draw = function() {
    ctx.fillStyle = "#00FF00";
    //body
    ctx.fillRect(250, 180, 190, 150); //main body
    ctx.fillRect(230, 295, 190, 95); //left bott
    ctx.fillRect(250, 280, 210, 110); //right bott
    ctx.fillRect(235, 180, 20, 40); //left top
    ctx.fillRect(265, 140, 58, 40); //top left
    ctx.fillRect(380, 130, 40, 60); //top right
    //legs
    ctx.fillStyle = "Blue";
    ctx.fillRect(305, 390, 15, 15); //leg 1
    ctx.fillRect(255, 405, 65, 10);

    ctx.fillRect(365, 390, 15, 15); //leg 2
    ctx.fillRect(365, 405, 65, 10);

    //face
    ctx.fillRect(312, 315, 63, 13); //mouth
    ctx.fillRect(290, 250, 30, 15); //left eye
    ctx.fillRect(360, 250, 30, 15); //right eye

    //eyebrows
    ctx.beginPath();
    ctx.moveTo(265, 260);
    ctx.lineTo(260, 250);
    ctx.lineTo(300, 210);
    ctx.lineTo(305, 220);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(420, 260);
    ctx.lineTo(425, 250);
    ctx.lineTo(375, 210);
    ctx.lineTo(370, 220);
    ctx.fill();
};
/* test to draw player; need to fix sizing
var p = new Player(200,200);
p.draw(); */