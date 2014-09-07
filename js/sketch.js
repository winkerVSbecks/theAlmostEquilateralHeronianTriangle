var triangle;
var friction = 0.8;
var gravity = 5;
var w, h;
var keys = [];

paper.install(window);

window.onload = function() {
  paper.setup('theAlmostEquilateralHeronianTriangle');
  triangle = new Triangle(4, 60);
  paper.view.draw();

  w = paper.view.size.width;
  h = paper.view.size.height;

  paper.view.onFrame = function (event) {
    triangle.update();
    // triangle.reColour();
    // bgReColour();
  };
};


window.onkeydown = function (event) {
  keys[event.keyCode] = true;
};

window.onkeyup = function (event) {
  keys[event.keyCode] = false;
};

window.onresize = function (event) {
  // triangle.position = paper.view.center;
  w = paper.view.size.width;
  h = paper.view.size.height;
};

window.onmousedown = function () {
  triangle.reColour();
};


var bgReColour = function () {
  var g = gradients[Math.floor(Math.random()*gradients.length)];

  $('body').css({
    background: 'linear-gradient( 0deg, ' + g.colour1 + ', ' + g.colour2 + ' )'
  });
};