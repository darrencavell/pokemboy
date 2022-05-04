/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';

const Pokemon = props => {
  const { isAnimating = false, overridenCss, src } = props;

  const pokemonCatched = keyframes`
    to { opacity: 0; }
  `;

  const baseCss = css`
    image-rendering: pixelated;
  `;

  return (
    <img
      src={src}
      css={css`
        ${baseCss}
        ${overridenCss}
        ${isAnimating && css`
          animation: 0.5s forwards 0.5s ${pokemonCatched};
        `}
      `}
      alt={`pokemon-${src}`}
    />
  )
}

export default Pokemon;
