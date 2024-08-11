/**
 * @description 单个水管类
 */

import Rectangle from './Rectangle';

class Pipe extends Rectangle {
  constructor(height, top, speed, pipeDom) {
    // 游戏面板的宽度
    const gameWidth = document.querySelector('.game').clientWidth;
    super(50, height, gameWidth, top, speed, 0, pipeDom);
  }

  onMove() {
    // 水管跑到最左边然后不见了之后，要移除dom
    if (this.left < -this.width) {
      this.dom.remove();
    }
  }
}

export default Pipe;
