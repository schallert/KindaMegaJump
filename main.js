var canvas, canvas2, ctx, ctx2, windowWidth, windowHeight, canvasWidth, canvasHeight, i, player;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

canvas = document.getElementById("myCanvas");
canvas2 = document.getElementById("canvas2");
ctx = canvas.getContext("2d");
ctx2 = canvas2.getContext("2d");

windowHeight = window.innerHeight;
windowWidth = window.innerWidth;

canvas.setAttribute("height", windowHeight - 100);
canvas.setAttribute("width", Math.floor(windowWidth / 2.5));
canvas2.setAttribute("height", windowHeight - 100);
canvas2.setAttribute("width", Math.floor(windowWidth / 2.5));

canvasHeight = canvas.getAttribute("height");
canvasWidth = canvas.getAttribute("width");
canvas2Height = canvas.getAttribute("height");
canvas2Width = canvas.getAttribute("width");

ctx.save();

ctx.fillStyle = 'black';

ctx.save();

ctx.fillRect(0, 0, canvasWidth, canvasHeight);



// ========= CIRCLES =========

function Circle(ctx, x, y, radius, startAngle, endAngle, fill) {
  this.ctx = ctx || null;
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 1;
  this.startAngle = startAngle || 0;
  this.endAngle = endAngle || Math.PI * 2;
  this.fill = fill || 'white';
}

Circle.prototype.draw = function() {
  this.ctx.save();
  this.ctx.fillStyle = this.fill;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
  this.ctx.closePath();
  this.ctx.fill();
  this.ctx.restore();
}

Circle.prototype.clear = function () {
  var oldFill = this.fill;
  this.fill = 'black';
  // this.ctx.fillStyle = 'red';
  this.radius += 1;
  this.draw();
  this.fill = oldFill;
  // this.ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
}

Circle.prototype.clearLegit = function () {
  this.ctx.clearRect(this.x, this.y, this.radius * 2, this.radius * 2); 
}

Circle.prototype.move = function (x, y, radius) {
  this.clear();
  this.x = x;
  this.y = y;
  this.radius = radius || this.radius;
  this.draw();
}

Circle.prototype.moveDown = function (dist) {
  dist = dist || 1;
  this.move(this.x, this.y + dist, this.radius);
  if (this.y > canvasHeight) {
    clearInterval(this.int_id);
    this.clearLegit();
  }
}

Circle.prototype.fall = function (drop, time) {
  var ptr = this;
  var int_id = setInterval(function () {
    ptr.moveDown(drop || 100);
  }, time || 1250);
  this.int_id = int_id;
}

// ========= SHAPES =========

function Shape(ctx, x, y, w, h, fill) {
  this.ctx = ctx || null;
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;

  r = getRandomInt(150, 200).toString();
  g = getRandomInt(200, 255).toString();
  b = getRandomInt(150, 200).toString();
  this.fill = fill || 'rgb(' + r + ',' + g + ',' + b + ')';
}

Shape.prototype.draw = function() {
  this.ctx.fillStyle = this.fill;
  this.ctx.fillRect(this.x, this.y, this.w, this.h);
}

Shape.prototype.clear = function () {
  this.ctx.clearRect(this.x, this.y, this.w, this.h);
}

Shape.prototype.move = function (x, y, w, h) {
  this.clear();
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw();
}

Shape.prototype.moveRight = function (dist) {
  dist = dist || 1;
  this.move(this.x + dist, this.y, this.w, this.h);
}

Shape.prototype.moveDown = function (dist) {
  dist = dist || 1;
  this.move(this.x, this.y + dist, this.w, this.h);
  if (this.y > 500) {
    clearInterval(this.int_id);
    this.clear();
  }
}

Shape.prototype.fall = function (drop, time) {
  var ptr = this;
  var int_id = setInterval(function () {
    ptr.moveDown(drop || 200);
  }, time || 500);
  this.int_id = int_id;
}

// make it rain
setInterval(function () {
  for (i = 0; i < 50; i ++) {
    var circ = new Circle(ctx, getRandomInt(0, canvasWidth), getRandomInt(0, canvasHeight) - canvasHeight, 2, null, null, 'white');
    circ.draw();
    circ.fall(5, 15);
  }
}, 2000);


function Player(boxHeight, boxWidth, x, y) {
  this.boxHeight = boxHeight;
  this.boxWidth = boxWidth;
  this.health = 10;
  this.x = x || 250;
  this.y = y || 250;
}

Player.prototype.draw = function() {
  ctx2.save();
  // ctx2.scale(.25, .25);
  ctx2.fillStyle = "#00FF00";
  ctx2.fillRect(250, 130, 230, 260); //whole box
  ctx2.clearRect(250, 220, 20, 75); //clear left mid
  ctx2.clearRect(250, 130, 30, 50); //clear left top
  ctx2.clearRect(250, 130, 5, 95); //trim left
  ctx2.clearRect(460, 130, 20, 150); //clear right
  ctx2.clearRect(440, 130, 20, 50); //clear top right
  ctx2.clearRect(340, 130, 60, 50); //clear top mid
  ctx2.clearRect(280, 130, 60, 10); //trim top left

  ctx2.fillStyle = "Blue";
  ctx2.fillRect(325, 390, 15, 15); //leg 1
  ctx2.fillRect(275, 405, 65, 10);

  ctx2.fillRect(385, 390, 15, 15); //leg 2
  ctx2.fillRect(385, 405, 65, 10);

  //face
  ctx2.fillRect(332, 315, 63, 13); //mouth
  ctx2.fillRect(310, 250, 30, 15); //left eye
  ctx2.fillRect(380, 250, 30, 15); //right eye

  // //eyebrows
  ctx2.lineWidth = 7.5;
  ctx2.strokeStyle = "Blue";
  ctx2.beginPath();
  ctx2.moveTo(285, 260);
  ctx2.lineTo(325, 220);
  ctx2.stroke();

  ctx2.beginPath();
  ctx2.moveTo(440, 260);
  ctx2.lineTo(390, 220);
  ctx2.stroke();

  ctx2.restore();
};

 // test to draw player; need to fix sizing
var p = new Player(200,200);
 //ctx2.save();
// ctx2.translate(400, 400);
p.draw();
// ctx2.restore();