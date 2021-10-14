class QuadTree {
  constructor(capacity, bounds) {
    this.data = [];
    this.capacity = capacity;
    this.bounds = bounds;
    this.ne = null;
    this.nw = null;
    this.se = null;
    this.sw = null;
  }
  insert(item) {
    if (!this.bounds.contains(item)) {
      return false;
    }
    if (this.data.length < this.capacity) {
      this.data.push(item);
    } else {
      if (!this.ne) {
        this.subdivide();
      }
      this.ne.insert(item);
      this.nw.insert(item);
      this.se.insert(item);
      this.sw.insert(item);
    }
  }
  subdivide() {
    let x = this.bounds.x;
    let y = this.bounds.y;
    let width = this.bounds.w / 2;
    let height = this.bounds.h / 2;
    this.nw = new QuadTree(this.capacity, new Rectangle(x, y, width, height));
    this.ne = new QuadTree(
      this.capacity,
      new Rectangle(x + width, y, width, height)
    );
    this.sw = new QuadTree(
      this.capacity,
      new Rectangle(x, y + height, width, height)
    );
    this.se = new QuadTree(
      this.capacity,
      new Rectangle(x + width, y + height, width, height)
    );

    this.data.forEach((item) => {
      this.ne.insert(item);
      this.nw.insert(item);
      this.se.insert(item);
      this.sw.insert(item);
    });
    this.data = [];
  }
  show() {
    if (this.ne) {
      this.ne.show();
      this.nw.show();
      this.se.show();
      this.sw.show();
    }
    stroke(255);
    noFill();
    strokeWeight(1);
    rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (
      point.x > this.x &&
      point.x < this.x + this.w &&
      point.y > this.y &&
      point.y < this.y + this.h
    );
  }

  collision(rect) {
    return !(
      rect.x > this.x + this.w ||
      rect.x + rect.w < this.x ||
      rect.y > this.y + this.h ||
      rect.y + rect.h < this.y
    );
  }
}
