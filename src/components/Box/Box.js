/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const Box = props => {
  const { overridenCss = '', color = '#000000', children } = props;

  return (
    <div css={css`
      position: relative;
      ${overridenCss}
    `}>
      <div css={css`
        position: absolute;
        inset: 0px -4px;
        background: ${color};
        left: 0;
        right: 0;
        top: -4px;
        bottom: -4px;
        z-index: 1;
      `}></div>
      <div css={css`
        position: absolute;
        inset: -4px 0;
        background: ${color};
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
