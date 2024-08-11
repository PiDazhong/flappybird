/**
 * @description 大地类
 */

import Rectangle from './Rectangle';

class Ground extends Rectangle {
  constructor(speed, groundDom) {
    const groundStyle = getComputedStyle(groundDom);
    const groundWidth = parseFloat(groundStyle.width);
    const groundHeight = parseFloat(groundStyle.height);
    const groundTop = parseFloat(groundStyle.top);
    super(groundWidth, groundHeight, 0, groundTop, speed, 0, groundDom);
  }

  onMove() {
    if (this.left < -this.width / 2) {
      this.left = 0;
    }
  }
}

export default Ground;
