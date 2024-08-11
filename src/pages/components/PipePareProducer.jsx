/**
 * @description 生成 成对水管类
 */

import PipePare from './PipePare';

class PipePareProducer {
  constructor(speed, gameDom) {
    this.speed = speed;
    this.gameDom = gameDom;

    this.pairs = [];
    this.timer = null;
    this.tick = 2000;
  }

  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pairs.push(new PipePare(this.speed, this.gameDom));
    }, this.tick);
  }

  stopProducer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  initProducer() {
    clearInterval(this.timer);
    this.timer = null;
    this.pairs = [];
    // remove页面上所有的 pipe 类
    const pipes = document.querySelectorAll('.pipe');
    // 遍历并移除每个元素
    pipes.forEach((pipe) => {
      pipe.remove();
    });
  }
}

export default PipePareProducer;
