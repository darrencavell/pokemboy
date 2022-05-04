/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import Pokemon from '../Pokemon/Pokemon';

const IndividualPokemon = props => {
  const {
    pokemon,
    onClick,
  } = props;

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
          margin-left: 20%;
        }
      `}
      onClick={onClick}
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

export default IndividualPokemon;
