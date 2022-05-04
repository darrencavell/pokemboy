/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import Box from './Box/Box';

const Icon = props => {
  const { onClick, src } = props;

  return (
    <div css={css`
      position: absolute;
      top: 16px;
      right: 16px;
    `}>
      <Box>
        <div css={css`
          position: relative;
          background-color: rgb(245, 245, 245);
          z-index: 2;
          width: 100%;
          width: 72px;
          height: 72px;
        `}>
          <img
            css={css`
              image-rendering: pixelated;
              width: 72px;
              height: 72px;
            `}
            alt={`icon-${src}`}
            src={src}
            onClick={onClick}
          />
        </div>
      </Box>
    </div>
  )
}

export default Icon;
