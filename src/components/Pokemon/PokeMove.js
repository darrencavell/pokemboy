/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { css } from '@emotion/react';

const PokeMove = props => {
  const { pokemonName, moves } = props;

  if (moves) {
    return (
      <>
        <div css={css`
          text-transform: uppercase;
          padding: 12px 0;
          font-weight: bold;
        `}>Moves</div>
        <div>
          {moves.map(currentMove => {
            return (
              <div css={css`
                border-bottom: 1px solid #d6d6d6;
              `} key={`${pokemonName}-${currentMove.move.name}`}>{currentMove.move.name}</div>
            );
          })}
        </div>
      </>
    )
  }

  return null;
}

export default memo(
  PokeMove,
  (prevProps, nextProps) => {
    JSON.stringify(prevProps.moves) === JSON.stringify(nextProps.moves)
  }
);
