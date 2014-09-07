
function Triangle(n, speed) {

  this.speed = speed;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;

  var pts = this.makeTriangle(n);

  this.p = new Path();

  this.x = (pts[0] * pts[0] + pts[1] * pts[1] - pts[2] * pts[2]) / (2 * pts[0])
  this.y = Math.pow(pts[1] * pts[1] - ((pts[0] * pts[0] + pts[1] * pts[1] - pts[2] * pts[2]) / (2 * pts[0])) * ((pts[0] * pts[0] + pts[1] * pts[1] - pts[2] * pts[2]) / (2 * pts[0])), 0.5);

  var firstSideX = this.lerpTimes(0, this.x, 10);
  var firstSideY = this.lerpTimes(0, -this.y, 10);
  var secondSideX = this.lerpTimes(this.x, pts[0], 10);
  var secondSideY = this.lerpTimes(-this.y, 0, 10);
  var thirdX = this.lerpTimes(pts[0], 0, 10);
  var thirdY = this.lerpTimes(0, 0, 10);

  this.p.add(new Point(0, 0));

  for (var i = 0; i < firstSideX.length; i++) {
    this.p.add(new Point(firstSideX[i], firstSideY[i]));
  };

  this.p.add(new Point(this.x, -this.y));

  for (var i = 0; i < secondSideX.length; i++) {
    this.p.add(new Point(secondSideX[i], secondSideY[i]));
  };

  this.p.add(new Point(pts[0], 0));

  for (var i = 0; i < thirdX.length; i++) {
    this.p.add(new Point(thirdX[i], thirdY[i]));
  };

  this.reColour();

  this.p.closed = true;
  this.p.position = view.center;
  // this.p.fullySelected = true;
};


Triangle.prototype.render = function() {
  // noStroke();
  // fill(this.col);
  // beginShape();
  //   for (var i = 0; i < this.now.length; i++) {
  //     vertex(this.now[i].x, this.now[i].y);
  //   };
  // endShape(CLOSE);
};


Triangle.prototype.reColour = function() {
  this.p.position = new Point(0, 0);
  var g = gradients[Math.floor(Math.random()*gradients.length)];
  var gradient = new Gradient([g.colour1, g.colour2]);
  var gradientColor = new Color(gradient, new Point(0, 0), new Point(0, -this.y));
  this.p.fillColor = gradientColor;
  this.p.position = view.center;
};


Triangle.prototype.makeTriangle = function(n) {
  for(a = 2, b = 4; --n;)
    b = -a + 4 * ( a = b );
  return [a - 1, a, a + 1];
};

Triangle.prototype.lerp =  function(start, stop, amt) {
  return amt * (stop - start) + start;
};

Triangle.prototype.lerpTimes = function(start, stop, times) {
  var lerps = [];
  for (var i =  times - 1; i >= 0; i--) {
    lerps.push(this.lerp(start, stop, i/times));
  };
  return lerps;
};


Triangle.prototype.jump = function() {
  if (!this.jumping) {
    this.jumping = true;
    this.velY = -this.speed * 2;
  }
};

Triangle.prototype.left = function() {
  if (this.velX > -this.speed) {
    this.velX -= 5;
  }
};

Triangle.prototype.right = function() {
  if (this.velX < this.speed) {
    this.velX += 5;
  }
};


Triangle.prototype.update = function() {

  if (keys[38] || keys[32]) {
    triangle.jump();
  }
  if (keys[39]) {
    triangle.right();
  }
  if (keys[37]) {
    triangle.left();
  }

  this.velX *= friction;

  this.velY += gravity;

  this.velY = this.velY <  -60 ? -60 : this.velY;

  // var move = new paper.Point(this.velX, this.velY);

  // this.p.position += move;

  this.p.position.x += this.velX;
  this.p.position.y += this.velY;

  // var lastLoc = this.position.clone();

  // this.x += this.velX;
  // this.y += this.velY;

  if (this.p.position.x >= w - this.p.bounds.width/2) {
      this.p.position.x = w - this.p.bounds.width/2;
  } else if (this.p.position.x <= this.p.bounds.width/2) {
      this.p.position.x = this.p.bounds.width/2;
  }

  if (this.p.position.y >= h - this.p.bounds.height) {
    this.p.position.y = h - 2 * this.p.bounds.height;
    this.jumping = false;
  }

  console.log(this.p.position.y, w, h, this.p.position.y >= h - this.p.bounds.height);
};