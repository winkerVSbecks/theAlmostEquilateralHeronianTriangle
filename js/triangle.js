
function Triangle(n) {

  var pts = this.makeTriangle(n);

  this.p = new Path();
  this.p.strokeColor = 'black';

  var x = (pts[0] * pts[0] + pts[1] * pts[1] - pts[2] * pts[2]) / (2 * pts[0])
  var y = Math.pow(pts[1] * pts[1] - ((pts[0] * pts[0] + pts[1] * pts[1] - pts[2] * pts[2]) / (2 * pts[0])) * ((pts[0] * pts[0] + pts[1] * pts[1] - pts[2] * pts[2]) / (2 * pts[0])), 0.5);

  var firstSideX = this.lerpTimes(0, x, 10);
  var firstSideY = this.lerpTimes(0, -y, 10);
  var secondSideX = this.lerpTimes(x, pts[0], 10);
  var secondSideY = this.lerpTimes(-y, 0, 10);
  var thirdX = this.lerpTimes(pts[0], 0, 10);
  var thirdY = this.lerpTimes(0, 0, 10);

  this.p.add(new Point(0, 0));

  for (var i = 0; i < firstSideX.length; i++) {
    this.p.add(new Point(firstSideX[i], firstSideY[i]));
  };

  this.p.add(new Point(x, -y));

  for (var i = 0; i < secondSideX.length; i++) {
    this.p.add(new Point(secondSideX[i], secondSideY[i]));
  };

  this.p.add(new Point(pts[0], 0));

  for (var i = 0; i < thirdX.length; i++) {
    this.p.add(new Point(thirdX[i], thirdY[i]));
  };

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


Triangle.prototype.makeTriangle = function(n) {
  for(a = 2, b = 4; --n;)
    b = -a + 4 * ( a = b );
  return [a - 1, a, a + 1];
};

Triangle.prototype.lerp =  function (start, stop, amt) {
  return amt * (stop - start) + start;
};

Triangle.prototype.lerpTimes = function (start, stop, times) {
  var lerps = [];
  for (var i =  times - 1; i >= 0; i--) {
    lerps.push(this.lerp(start, stop, i/times));
  };
  return lerps;
};