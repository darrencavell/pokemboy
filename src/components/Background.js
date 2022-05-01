/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

const Background = props => {
  return (
    <div css={css`
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
    `}></div>
  );
}

export default Background;
