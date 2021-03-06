/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';

const Pokeball = props => {
  const { isAnimating } = props;

  const throwBall = keyframes`
    0% { transform: translate(-236px, -124px) rotate(8deg); }
    5% { transform: translate(-193px, -252px) rotate(14deg); }
    10% { transform: translate(-154px, -352px) rotate(21deg); }
    15% { transform: translate(-128px, -417px) rotate(25deg); }
    20% { transform: translate(-91px, -449px) rotate(31deg); }
    25% { transform: translate(-47px, -371px)) rotate(37deg); }
    30% { transform: translate(-65px, -396px) rotate(39deg); }
    35% { transform: translate(-30px, -304px) rotate(44deg); }
    40% { transform: translate(-26px, -279px) rotate(51deg); }
    45% { transform: translate(-20px, -268px) rotate(60deg); }
    50% { transform-origin: center; transform: translate(-20px, -264px) rotate(-30deg); }
    64% { transform-origin: center; transform: translate(-23px, -260px) rotate(0deg); }
    78% { transform-origin: center; transform: translate(-20px, -268px) rotate(30deg); }
    100% { transform-origin: center; transform: translate(-23px, -258px) rotate(0deg); }
  `;

  return (
    <img
      css={css`
        position: absolute;
        left: 48%;
        bottom: 10%;
        z-index: 1;
        width: 64px;
        height: 64px;
        opacity: 0;
        ${isAnimating && css`
          animation: 1.5s forwards ${throwBall};
          opacity: 1;
        `}
      `}
      src="/assets/pokeball.png"
      alt="pokeball"
    />
  )
}

export default Pokeball;
