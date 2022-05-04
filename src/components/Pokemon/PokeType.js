/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { css } from '@emotion/react';

const PokeType = props => {
  const { pokemonName, types } = props;

  if (types) {
    return (
      <>
        <div css={css`
          text-transform: uppercase;
          padding: 12px 0;
          font-weight: bold;
        `}>Moves</div>
        <div>
          {types.map(currentType => {
            return (
              <div css={css`
                border-bottom: 1px solid #d6d6d6;
              `} key={`${pokemonName}-${currentType.type.name}`}>{currentType.type.name}</div>
            );
          })}
        </div>
      </>
    )
  }

  return null;
}

export default memo(
  PokeType,
  (prevProps, nextProps) => {
    JSON.stringify(prevProps.types) === JSON.stringify(nextProps.types)
  }
);
