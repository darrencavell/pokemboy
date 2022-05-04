/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const PokeType = props => {
  const { types } = props;

  if (types) {
    return (
      <>
        <div css={css`
          text-transform: uppercase;
          padding: 12px 0;
          font-weight: bold;
        `}>Moves</div>
        <div>
          {types.map((currentType, index) => {
            console.log('currentType', currentType);
            return (
              <div css={css`
                border-bottom: 1px solid #d6d6d6;
              `} key={`${currentType.type.name}-${index}`}>{currentType.type.name}</div>
            );
          })}
        </div>
      </>
    )
  }

  return null;
}

export default PokeType;
