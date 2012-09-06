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