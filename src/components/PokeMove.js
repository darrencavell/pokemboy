/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const PokeMove = props => {
  const { moves } = props;

  if (moves) {
    return (
      <>
        <div css={css`
          text-transform: uppercase;
          padding: 12px 0;
          font-weight: bold;
        `}>Moves</div>
        <div>
          {moves.map((currentMove, index) => {
            console.log('currentMove', currentMove);
            return (
              <div css={css`
                border-bottom: 1px solid #d6d6d6;
              `} key={`${currentMove.move.name}-${index}`}>{currentMove.move.name}</div>
            );
          })}
        </div>
      </>
    )
  }

  return null;
}

export default PokeMove;
