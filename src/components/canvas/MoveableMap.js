/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';

const MoveableMap = props => {
  const {
    gameObject,
    scale,
    src,
  } = props;

  const direction = gameObject?.currentBehaviour?.direction || '';
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0);
    }
    image.src = src;
  }, []);

  const getTransform = () => {
    const screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const nudge = getNudge();

    let x = -gameObject.x * 16 * scale / 2 + nudge.x;
    let y = -gameObject.y * 16 * scale / 2 + nudge.y;

    return `translate(${x}px, ${y}px)`;
  }

  const getNudge = () => {
    let x = 0, y = 0;
    switch (direction) {
      case 'UP':
        return { x, y: gameObject.movingProgress / 16 * 16 * scale / 2 };
      case 'DOWN':
        return { x, y: -gameObject.movingProgress / 16 * 16 * scale / 2 };
      case 'LEFT':
        return { x: gameObject.movingProgress / 16 * 16 * scale / 2, y };
      case 'RIGHT':
        return { x: -gameObject.movingProgress / 16 * 16 * scale / 2, y };
      default:
        return { x, y };
    }
  }

  return (
    <div css={css`
      position: absolute;
      top: 0;
      left: 0;
      transform: ${getTransform()}
    `}>
      <canvas
        width={320}
        height={320}
        css={css`
          transform-origin: left top;
          transform: scale(${scale});
          image-rendering: pixelated;
        `}
        ref={canvasRef}
      />
    </div>
  )
}

export default MoveableMap;
