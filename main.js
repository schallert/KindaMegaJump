var canvas, canvas2, ctx, ctx2, windowWidth, windowHeight, canvasWidth, canvasHeight, i, player, circ;

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

function Circle(c, x, y, radius, startAngle, endAngle, fill, forceLegit) {
  this.c = c || null;
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 1;
  this.startAngle = startAngle || 0;
  this.endAngle = endAngle || Math.PI * 2;
  this.fill = fill || 'white';
  this.forceLegit = forceLegit || false;
}

Circle.prototype.draw = function() {
  this.c.save();
  this.c.fillStyle = this.fill;
  this.c.beginPath();
  this.c.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
  this.c.closePath();
  this.c.fill();
  this.c.restore();
}

Circle.prototype.clear = function () {
  var oldFill = this.fill;
  this.fill = 'black';
  // this.c.fillStyle = 'red';
  this.radius += 1;
  this.draw();
  this.fill = oldFill;
  // this.c.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
}

Circle.prototype.clearLegit = function () {
  this.c.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2); 
}

Circle.prototype.move = function (x, y, radius) {
  if (this.forceLegit)
    this.clearLegit();
  else
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

function Shape(c, x, y, w, h, fill) {
  this.c = c || null;
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
  this.c.fillStyle = this.fill;
  this.c.fillRect(this.x, this.y, this.w, this.h);
}

Shape.prototype.clear = function () {
  this.c.clearRect(this.x, this.y, this.w, this.h);
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
for (i = 0; i < 2500; i ++) {
  circ = new Circle(ctx, getRandomInt(0, canvasWidth), getRandomInt(0, canvasHeight), 1, null, null, 'white');
  circ.draw();
  // circ.fall(2, 15); // NOTE: the stars used to be constantly moving on a setInterval, but canvas is slow
                        // and it was too laggy / barely worked on firefox
}

function Player(boxHeight, boxWidth) {
  this.boxHeight = boxHeight;
  this.boxWidth = boxWidth;
  this.health = 10;
}

Player.prototype.draw = function(c) {
  c.save();
  c.scale(1, .45);
  c.translate(-80, -100);

  c.fillStyle = "#00FF00";
  //body
  c.fillRect(250, 180, 190, 150); //main body
  c.fillRect(230, 295, 190, 95); //left bott
  c.fillRect(250, 280, 210, 110); //right bott
  c.fillRect(235, 180, 20, 40); //left top
  c.fillRect(265, 140, 58, 40); //top left
  c.fillRect(380, 130, 40, 60); //top right

  // //legs
  c.fillStyle = "Blue";
  c.fillRect(305, 390, 15, 15); //leg 1
  c.fillRect(255, 405, 65, 10);

  c.fillRect(365, 390, 15, 15); //leg 2
  c.fillRect(365, 405, 65, 10);

  //face
  c.fillRect(312, 315, 63, 13); //mouth
  c.fillRect(290, 250, 30, 15); //left eye
  c.fillRect(360, 250, 30, 15); //right eye

  // //eyebrows
  c.lineWidth = 7.5;
  c.strokeStyle = "Blue";
  c.beginPath();
  c.moveTo(265, 260);
  c.lineTo(305, 220);
  c.stroke();

  c.beginPath();
  c.moveTo(420, 260);
  c.lineTo(370, 220);
  c.stroke();

  c.restore();
};
 // test to draw player; need to fix sizing
var p = new Player(200,200);
// ctx2.save();
// ctx2.translate(400, 400);
p.draw(ctx);
// ctx2.restore();

setInterval(function () {
  setTimeout(function () {
    for (i = 1; i < getRandomInt(4,9); i ++) {
      // if (i % 2 != 0) continue;
      circ = new Circle (ctx2, getRandomInt(90, 110) * i, 140, 15, null, null, 'red', true);
      circ.draw();
      circ.fall(2, 8);
    }
  }, getRandomInt(1500, 3500));
}, 2000);

player = new Shape(ctx2, 250, 600, 60, 50, 'red');
player.draw();

window.addEventListener('keydown', function (e) {
  var defDist = 15;
  switch (e.keyCode) {
    case 39:
      player.moveRight(defDist);
      break;
    case 37:
      player.moveRight(-1 * defDist);
      break;
    default:
      console.log('no case');
      break;
  }
});