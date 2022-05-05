/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import Box from './Box/Box';

const Loading = () => {
  return (
    <div css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9ac3cf;
      width: 100vw;
      height: 100vh;
    `}
    >
    <Box>
      <div css={css`
        position: relative;
        z-index: 2;
        background-color: #ffffff;
        padding: 8px 16px;
      `}>
        Loading...
      </div>
    </Box>
    </div>
  )
}

export default Loading;
