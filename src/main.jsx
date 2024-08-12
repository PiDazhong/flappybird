import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Game from 'pages/index.jsx';

// 全局对象，用于调试信息输出
Object.defineProperty(window, 'DEBUG_INFO', {
  get: function () {
    const githubStr = `项目地址：https://github.com/PiDazhong/flappybird`;
    const gameStr = `部署地址：https://flappybird.quantanalysis.cn`;

    return `\n${githubStr}\n\n${gameStr}\n`;
  },
});

console.log(window['DEBUG_INFO']);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
);
