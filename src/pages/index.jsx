import {
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import './index.css';
import Sky from './components/Sky';
import Ground from './components/Ground';
import Bird from './components/Bird';
import PipePareProducer from './components/PipePareProducer';

function Game() {
  const isJumpingRef = useRef(false); // 用于追踪空格键是否被按住
  const jumpIntervalRef = useRef(null);

  const intervalRef = useRef(null);
  const skyRef = useRef(null);
  const groundRef = useRef(null);
  const birdRef = useRef(null);
  const pairPipeRef = useRef(null);
  const pairPipeProducerRef = useRef(null);

  const [gameover, setGameover] = useState(false);
  const [gamepause, setGamepause] = useState(true);

  const startGame = () => {
    if (gameover) {
      return;
    }
    if (intervalRef.current) {
      return;
    }
    setGamepause(false);
    intervalRef.current = setInterval(() => {
      if (skyRef.current) {
        skyRef.current.move(8 / 1000);
      }
      if (groundRef.current) {
        groundRef.current.move(16 / 1000);
      }
      if (birdRef.current) {
        birdRef.current.startSwing();
        birdRef.current.move(16 / 1000);

        // 检测小鸟是否坠地
        if (birdRef.current.isHitGround()) {
          endGame();
          return;
        }
      }
      if (pairPipeRef.current) {
        // pairPipeRef.current.move(16 / 1000);
      }
      if (pairPipeProducerRef.current) {
        pairPipeProducerRef.current.startProduce();
        pairPipeProducerRef.current.pairs.forEach((pair) => {
          pair.move(16 / 1000);

          // 检测小鸟是否撞到柱子
          if (pair.isHit(birdRef.current)) {
            endGame();
            return;
          }
        });
      }
    }, 16);
  };

  const pauseGame = () => {
    if (gameover) {
      return;
    }
    setGamepause(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 小鸟停止翅膀
    birdRef.current.stopSwing();
    // 停止生成柱子
    pairPipeProducerRef.current.stopProducer();
  };

  // 重新设置游戏
  const resetGame = () => {
    // 清掉 计时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 小鸟停止翅膀
    birdRef.current.stopSwing();
    // 停止生成柱子
    pairPipeProducerRef.current.stopProducer();
    // 删除全部柱子
    pairPipeProducerRef.current.initProducer();
    // 清理掉ref
    clearDoms();
    // 重新挂载dom
    setDoms();
    setGameover(false);
    setGamepause(true);
  };

  const endGame = () => {
    pauseGame();
    setGameover(true);
    setGamepause(false);
  };

  // 挂载dom
  const setDoms = () => {
    const skyDom = document.querySelector('.sky');
    if (skyDom) {
      skyDom.style.left = 0;
      skyRef.current = new Sky(skyDom);
    }
    const groundDom = document.querySelector('.ground');
    if (skyDom) {
      groundDom.style.left = 0;
      groundRef.current = new Ground(-100, groundDom);
    }
    const birdDom = document.querySelector('.bird');
    if (birdDom) {
      birdDom.style.top = '120px';
      birdRef.current = new Bird(birdDom);
    }
    const gameDom = document.querySelector('.game');
    if (gameDom) {
      // pairPipeRef.current = new PipePare(-100, gameDom);
      pairPipeProducerRef.current = new PipePareProducer(-100, gameDom);
    }
  };

  // clear 挂载dom
  const clearDoms = () => {
    skyRef.current = null;
    groundRef.curren = null;
    birdRef.current = null;
  };

  const birdJump = () => {
    if (birdRef.current) {
      birdRef.current.jump();
    }
  };

  useLayoutEffect(() => {
    setDoms();

    // 清除定时器
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === 'Space' && birdRef.current && !isJumpingRef.current) {
        isJumpingRef.current = true;
        // 开始持续调用 jump 方法
        jumpIntervalRef.current = setInterval(() => {
          birdRef.current.jump();
        }, 50); // 每 50 毫秒调用一次 jump
      }
      if (event.code === 'KeyO') {
        startGame(); // 按下 O 键开始游戏
      }
      if (event.code === 'KeyP') {
        pauseGame(); // 按下 P 键暂停游戏
      }
      if (event.code === 'KeyR') {
        resetGame(); // 按下 R 键重启游戏
      }
    },
    [gameover, gamepause],
  );

  const handleKeyUp = (event) => {
    if (event.code === 'Space') {
      isJumpingRef.current = false;
      // 停止 jump 方法的持续调用
      clearInterval(jumpIntervalRef.current);
      jumpIntervalRef.current = null;
    }
  };

  // 添加空格键事件监听，按空格触发小鸟的jump
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 清除事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown]);

  return (
    <>
      <div className="game">
        {gameover && (
          <div className="gameover">
            <div className="gameover-text"></div>
          </div>
        )}
        {gamepause && (
          <div className="gamepause">
            <div className="gamepause-text" onClick={() => startGame()}></div>
          </div>
        )}
        <div className="sky"></div>
        <div className="bird swing3"></div>
        <div className="ground"></div>
      </div>
      <div className="tip">
        按 O
        <span className="clickable" onClick={() => startGame()}>
          开始游戏
        </span>
        按 P
        <span className="clickable" onClick={() => pauseGame()}>
          暂停游戏
        </span>
        按 R
        <span className="clickable" onClick={() => resetGame()}>
          重启游戏
        </span>
        按 空格
        <span className="clickable" onClick={() => birdJump()}>
          触发小鸟的跳跃
        </span>
      </div>
    </>
  );
}

export default Game;
