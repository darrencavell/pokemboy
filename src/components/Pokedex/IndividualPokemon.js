/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { memo } from 'react';

import Pokemon from '../Pokemon/Pokemon';

const IndividualPokemon = props => {
  const { pokemon } = props;

  return (
    <div
      key={pokemon.name}
      css={css`
        position: relative;
        display: flex;
        flex: 0 0 300px;
        width: 300px;
        height: 300px;

        &:first-of-type {
          margin-left: 30%;
        }
      `}
    >
      <Pokemon
        overridenCss={css`
          width: 100%;
        `}
        src={pokemon.image}
      />
      <h2 css={css`
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-transform: uppercase;
      `}>
        {pokemon.name}
      </h2>
    </div>
  )
}

export default memo(
  IndividualPokemon,
  (prevProps, nextProps) => {
    prevProps.pokemon.name === nextProps.pokemon.name
  }
);
