/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from 'react';
import { css, keyframes } from '@emotion/react';

const AnimatedPerson = props => {
  const { gameObject, scale, src } = props;

  const direction = gameObject?.currentBehaviour?.direction || '';
  const canvasRef = useRef();

  const characterWalkUp = keyframes`
    0% { transform: translate(0, -75%); }
    100% { transform: translate(-100%, -75%); }
  `;

  const characterWalkDown = keyframes`
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  `;

  const characterWalkLeft = keyframes`
    0% { transform: translate(0, -25%); }
    100% { transform: translate(-100%, -25%); }
  `;

  const characterWalkRight = keyframes`
    0% { transform: translate(0, -50%); }
    100% { transform: translate(-100%, -50%); }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0);
    }
    image.src = src;
  }, []);

  const getSpritesheet = () => {
    switch (direction) {
      case 'UP':
        return 'translate(0, 25%)';
      case 'DOWN':
        return 'translate(0, 0)';
      case 'LEFT':
        return 'translate(0, -25%)';
      case 'RIGHT':
        return 'translate(0, 25%)';
      default:
        return 'translate(0, 0)';
    }
  }

  const getAnimation = () => {
    switch (direction) {
      case 'UP':
        return css`${characterWalkUp} 0.5s steps(4) infinite`;
      case 'DOWN':
        return css`${characterWalkDown} 0.5s steps(4) infinite`;
      case 'LEFT':
        return css`${characterWalkLeft} 0.5s steps(4) infinite`;
      case 'RIGHT':
        return css`${characterWalkRight} 0.5s steps(4) infinite`;
      default:
        return css``;
    }
  }

  const getNudge = () => {
    let x = 0, y = 0;
    switch (direction) {
      case 'UP':
        return { x, y: -gameObject.movingProgress / 16 * 16 * scale };
      case 'DOWN':
        return { x, y: gameObject.movingProgress / 16 * 16 * scale };
      case 'LEFT':
        return { x: -gameObject.movingProgress / 16 * 16 * scale, y };
      case 'RIGHT':
        return { x: gameObject.movingProgress / 16 * 16 * scale, y };
      default:
        return { x, y };
    }
  }

  const getTransform = () => {
    return `translate(${gameObject.x * 32 * scale + getNudge().x}px, ${gameObject.y * 32 * scale + getNudge().y - 6}px)`;
  }

  return (
    <div css={css`
      position: absolute;
      top: 0;
      left: 0;
      transform: ${getTransform()};
    `}>
      <div css={css`
        width: 64px;
        height: 64px;
        overflow: hidden;
        position: relative;
      `}>
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          css={css`
            width: 256px;
            height: 256px;
            transform: ${getSpritesheet(direction)};
            animation: ${getAnimation(direction)};
          `}
        />
      </div>
    </div>
  )
}

export default AnimatedPerson;
