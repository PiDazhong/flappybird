/**
 * @description 可移动的矩形 类    所有游戏元素的父类
 */

class Rectangle {
  /**
   * 宽度   width
   * 高度   height
   * 横坐标  x
   * 纵坐标  y
   * 横向速度  xSpeed    px/s   正数向右，负数向左
   * 纵向速度  ySpeed    正数向下，负数向上
   * 对应dom对象
   */
  constructor(width, height, left, top, xSpeed, ySpeed, dom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.dom = dom;
  }

  render() {
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px';
  }

  onMove() {}

  /** 按照矩形的速度，移动了多少位置 */
  move(duration) {
    const xDiff = this.xSpeed * duration;
    const yDiff = this.ySpeed * duration;
    const newLeft = this.left + xDiff;
    const newTop = this.top + yDiff;
    this.left = newLeft;
    this.top = newTop;
    if (this.onMove) {
      this.onMove();
    }
    this.render();
  }
}

export default Rectangle;
