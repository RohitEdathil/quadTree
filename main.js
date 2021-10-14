let tree;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  tree = new QuadTree(1, new Rectangle(0, 0, width, height));
  for (let i = 0; i < 1000; i++) {
    var vt = createVector(random(width), random(height));
    tree.insert(vt);
    points.push(vt);
  }
}

let points = [];
function mouseClicked() {
  points.push(createVector(mouseX, mouseY));
  tree.insert(createVector(mouseX, mouseY));
}

function draw() {
  background(0);
  stroke(0, 255, 0);
  strokeWeight(2);
  for (let i = 0; i < points.length; i++) {
    circle(points[i].x, points[i].y, 5);
  }
  tree.show();
}
