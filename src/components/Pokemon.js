/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';

const Pokemon = props => {
  const { isAnimating } = props;

  const pokemonCatched = keyframes`
    to { opacity: 0; }
  `;

  return (
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      css={css`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(2);
        image-rendering: pixelated;
        ${isAnimating && css`
          animation: 0.5s forwards 0.5s ${pokemonCatched};
        `}
      `}
    />
  )
}

export default Pokemon;
