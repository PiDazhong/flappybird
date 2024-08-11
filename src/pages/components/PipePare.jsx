/**
 * @description 成对水管类
 */

import Pipe from './Pipe';

// 随机一个水管的高度
function getRondom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class PipePare {
  constructor(speed, gameDom) {
    // 游戏面板的高度
    const gameHight = document.querySelector('.game').clientHeight;
    // 大地的高度
    const groundHeight = document.querySelector('.ground').clientHeight;
    // 两个水管之间的空隙高度
    this.spaceHeight = 150;
    // 水管的最小高度
    this.minHeight = 80;
    // 水管的最大高度
    this.maxHeight =
      gameHight - groundHeight - this.spaceHeight - this.minHeight;
    // 上水管的高度
    const upHeight = getRondom(this.minHeight, this.maxHeight);
    // 上水管的dom
    const upDom = document.createElement('div');
    upDom.className = 'pipe up';
    // 水管的高度
    this.upPipe = new Pipe(upHeight, -10, speed, upDom);
    // 下水管的高度
    const downHeight = gameHight - groundHeight - upHeight - this.spaceHeight;
    // 下水管的top
    const downTop = gameHight - groundHeight - downHeight + 20;
    // 上水管的dom
    const downDom = document.createElement('div');
    downDom.className = 'pipe down';
    this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

    // 游戏面板新增这两个水管dom
    gameDom.appendChild(upDom);
    gameDom.appendChild(downDom);
  }

  onMove() {
    // 水管跑到最左边然后不见了之后，要移除dom
    if (this.left < -this.width) {
      this.dom.remove();
    }
  }

  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }

  // 检查是否与小鸟碰撞
  isHit(bird) {
    const birdWidth = bird.width - 20;
    const pipeWidth = this.upPipe.width - 10;
    return (
      this.upPipe.left < bird.left + birdWidth &&
      this.upPipe.left + pipeWidth > bird.left &&
      (this.upPipe.top + this.upPipe.height > bird.top ||
        this.downPipe.top < bird.top + bird.height)
    );
  }
}

export default PipePare;
