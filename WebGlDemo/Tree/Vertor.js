export class Vertor extends Array {
  //继承数组
  constructor(x = 1, y = 0) {
    super(x, y);
  }
  set x(v) {
    this[0] = v; //规定该数组第一项
  }

  set y(v) {
    this[1] = v; //规定该数组第一项
  }
  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
    // 也可以使用 Math.hypot(this.x, this.y);
  }

  get dir() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vertor(this.x, this.y);
  }
  //加上
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  //减去
  minus(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  //缩放向量
  scale(a) {
    this.x *= a;
    this.y *= a;
    return this
  }
  //点成
  point(v) {
    return this.x * v.x + this.y * v.y;
  }

  //向量叉乘
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  //向量按照一定角度旋转
  rotate(angle) {
    const [x, y] = this;
    this.x = x * Math.cos(angle) + y * -Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);
    return this;
  }
}
