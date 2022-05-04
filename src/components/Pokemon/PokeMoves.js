/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { css } from '@emotion/react';

const PokeMoves = props => {
  const { pokemon } = props;

  if (pokemon.moves) {
    return (
      <>
        <div
          css={css`
            text-transform: uppercase;
            padding: 12px 0;
            font-weight: bold;
          `}
        >
          <span
            css={css`
              border-bottom: thick double #000000;
            `}
          >
            MOVES
          </span>
        </div>
        <div>
          {pokemon.moves.map(currentMove => {
            return (
              <div
                css={css`
                  border-bottom: 1px solid #d6d6d6;

                  &:last-of-type {
                    border-bottom: unset;
                  }
                `}
                key={`${pokemon.name}-${currentMove.move.name}`}
              >
                {currentMove.move.name}
              </div>
            );
          })}
        </div>
      </>
    )
  }

  return null;
}

export default memo(
  PokeMoves,
  (prevProps, nextProps) => {
    JSON.stringify(prevProps.pokemon.moves) === JSON.stringify(nextProps.pokemon.moves)
  }
);
