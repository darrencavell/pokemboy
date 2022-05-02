import { useEffect } from 'react';

const KeyboardArrowController = props => {
  const {
    arrows,
    setArrows,
    onPressed,
    onReleased
  } = props;

  const body = document.getElementsByTagName('body')[0];

  useEffect(() => {
    const upKeyPressed = () => { setArrows(onPressed('UP', arrows)) };
    const upKeyReleased = () => { setArrows(onReleased('UP', arrows)) };

    const downKeyPressed = () => { setArrows(onPressed('DOWN', arrows)) };
    const downKeyReleased = () => { setArrows(onReleased('DOWN', arrows)) };

    const leftKeyPressed = () => { setArrows(onPressed('LEFT', arrows)) };
    const leftKeyReleased = () => { setArrows(onReleased('LEFT', arrows)) };

    const rightKeyPressed = () => { setArrows(onPressed('RIGHT', arrows)) };
    const rightKeyReleased = () => { setArrows(onReleased('RIGHT', arrows)) };

    const handleUpKey = keyBinding([38, 87], upKeyPressed, upKeyReleased); // 38 = up, 87 = w
    const handleDownKey = keyBinding([40, 83], downKeyPressed, downKeyReleased); // 40 = down, 83 = s
    const handleLeftKey = keyBinding([37, 65], leftKeyPressed, leftKeyReleased); // 37 = left, 65 = a
    const handleRightKey = keyBinding([39, 68], rightKeyPressed, rightKeyReleased); // 39 = right, 68 = d

    return () => {
      [...handleUpKey,
        ...handleDownKey,
        ...handleLeftKey,
        ...handleRightKey
      ].map(event => {
        body.removeEventListener('keydown', event.handleKeyDown);
        body.removeEventListener('keyup', event.handleKeyUp);
      })
    }
  }, []);

  const keyBinding = (keyCodes, onKeyDown, onKeyUp) => {
    return keyCodes.map(keyCode => {
      let isPressing = true;

      const handleKeyDown = event => {
        if (event.keyCode === keyCode && isPressing) {
          isPressing = false;
          onKeyDown();
        }
      }

      const handleKeyUp = event => {
        if (event.keyCode === keyCode) {
          isPressing = true;
          onKeyUp();
        }
      }

      body.addEventListener('keydown', handleKeyDown);
      body.addEventListener('keyup', handleKeyUp);

      return {
        handleKeyDown,
        handleKeyUp
      }
    })
  }

  return null;
}

export default KeyboardArrowController;
