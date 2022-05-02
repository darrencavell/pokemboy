/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const Box = props => {
  const { children } = props;

  return (
    <div css={css`
      position: relative;
    `}>
      <div css={css`
        position: absolute;
        inset: 0px -4px;
        background: #000000;
        left: 0;
        right: 0;
        top: -4px;
        bottom: -4px;
        z-index: 1;
      `}></div>
      <div css={css`
        position: absolute;
        inset: -4px 0;
        background: #000000;
        left: -4px;
        right: -4px;
        top: 0;
        bottom: 0;
        z-index: 1;
      `}></div>
        {children}
    </div>
  );
}

export default Box;
