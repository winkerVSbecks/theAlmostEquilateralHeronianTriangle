var triangle;

paper.install(window);

window.onload = function() {
  paper.setup('theAlmostEquilateralHeronianTriangle');

  var triangle = new Triangle(5);
  // var triangle = new paper.Path.RegularPolygon(paper.view.center, 3, 50);
  // triangle.fillColor = '#e9e9ff';
  // triangle.fullySelected = true;
  paper.view.draw();
};


window.onresize = function (event) {
  triangle.position = paper.view.center;
};