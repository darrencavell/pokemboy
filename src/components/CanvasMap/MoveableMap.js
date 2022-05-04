/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';

const MoveableMap = props => {
  const {
    overridenCss,
    main,
    direction,
    scale,
    sizes,
    src,
  } = props;
  
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0);
    }
    image.src = src;
  }, [src]);

  const getTransform = () => {
    const nudge = getNudge();

    let x = -main.x * 16 * scale / 2 + nudge.x;
    let y = -main.y * 16 * scale / 2 + nudge.y;

    return `translate(${x}px, ${y}px)`;
  }

  const getNudge = () => {
    let x = 0, y = 0;
    switch (direction) {
      case 'UP':
        return { x, y: main.movingProgress / 16 * 16 * scale / 2 };
      case 'DOWN':
        return { x, y: -main.movingProgress / 16 * 16 * scale / 2 };
      case 'LEFT':
        return { x: main.movingProgress / 16 * 16 * scale / 2, y };
      case 'RIGHT':
        return { x: -main.movingProgress / 16 * 16 * scale / 2, y };
      default:
        return { x, y };
    }
  }

  const baseCss = css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: ${getTransform()}
  `;

  return (
    <div
      css={css`
        ${baseCss}
        ${overridenCss}
      `}
    >
      <canvas
        width={sizes.width}
        height={sizes.height}
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
