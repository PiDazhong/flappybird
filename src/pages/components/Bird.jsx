/**
 * @description 小鸟类
 */

import Rectangle from './Rectangle';

class Bird extends Rectangle {
  constructor(birdDom) {
    const birdStyle = getComputedStyle(birdDom);
    const birdWidth = parseFloat(birdStyle.width);
    const birdHeight = parseFloat(birdStyle.height);
    const birdLeft = parseFloat(birdStyle.left);
    const birdTop = parseFloat(birdStyle.top);
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, -10, birdDom);
    this.g = 1000; // 想下单加速度  px/s^2
    // 游戏面板的高度
    const gameHight = document.querySelector('.game').clientHeight;
    // 大地的高度
    const groundHeight = document.querySelector('.ground').clientHeight;
    this.maxY = gameHight - groundHeight - birdHeight;
    // 小鸟翅膀状态
    this.swing = 3;
    this.timer = null;
  }

  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swing++;
      if (this.swing === 4) {
        this.swing = 1;
      }
      this.render();
    }, 160);
  }

  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  onMove() {
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY;
    }
  }

  move(duration) {
    super.move(duration);
    // 按照加速度掉落
    const ySpeed = this.ySpeed + this.g * duration;
    this.ySpeed = ySpeed;
    if (this.onMove) {
      this.onMove();
    }
    this.render();
  }

  jump() {
    this.ySpeed = -300;
  }

  // 检查小鸟是否碰到地面
  isHitGround() {
    return this.top >= this.maxY;
  }

  render() {
    super.render();
    this.dom.className = `bird swing${this.swing}`;
  }
}

export default Bird;
