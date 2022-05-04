/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { css } from '@emotion/react';
import Box from '../Box/Box';

const PokeTypes = props => {
  const { pokemon } = props;

  if (pokemon.types) {
    return (
      <div
        css={css`
          display: flex;
        `}
      >
        {pokemon.types.map(currentType => {
          return (
            <Box
              key={`${pokemon.name}-${currentType.type.name}`}
              overridenCss={css`
                &:not(:first-of-type) {
                  margin-left: 12px;
                }
              `}
            >
              <div
                css={css`
                  position: relative;
                  color: #ffffff;
                  z-index: 2;
                  padding: 2px 8px;
                `}
              >
                {currentType.type.name}
              </div>
            </Box>
          );
        })}
      </div>
    )
  }

  return null;
}

export default memo(
  PokeTypes,
  (prevProps, nextProps) => {
    JSON.stringify(prevProps.types) === JSON.stringify(nextProps.types)
  }
);
