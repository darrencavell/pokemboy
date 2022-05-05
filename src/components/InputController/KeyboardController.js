import { useEffect } from 'react';

const KeyboardArrowController = props => {
  const {
    directions,
    onDirection,
    onPressed,
    onReleased
  } = props;

  const body = document.getElementsByTagName('body')[0];

  useEffect(() => {
    const upKeyPressed = () => { onDirection(onPressed('UP', directions)) };
    const upKeyReleased = () => { onDirection(onReleased('UP', directions)) };

    const downKeyPressed = () => { onDirection(onPressed('DOWN', directions)) };
    const downKeyReleased = () => { onDirection(onReleased('DOWN', directions)) };

    const leftKeyPressed = () => { onDirection(onPressed('LEFT', directions)) };
    const leftKeyReleased = () => { onDirection(onReleased('LEFT', directions)) };

    const rightKeyPressed = () => { onDirection(onPressed('RIGHT', directions)) };
    const rightKeyReleased = () => { onDirection(onReleased('RIGHT', directions)) };

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
