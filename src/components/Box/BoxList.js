/** @jsxImportSource @emotion/react */

import { forwardRef } from 'react';
import { css } from '@emotion/react';

const BoxList = forwardRef((props, ref) => {
  const { children, disabled, highlightable, padding, ...rests } = props;

  return (
    <div
      ref={ref}
      css={css`
        padding: ${padding};
        box-sizing: border-box;
        font-size: 18px;

        ${highlightable && `
          box-shadow:
            rgb(7 191 221) 0px 0px 0px 4px,
            rgb(125 226 242) 0px 0px 0px 8px,
            rgb(7 191 221) 0px 0px 0px 12px;
        `}

        ${disabled && `
          box-shadow:
            rgb(158 162 163) 0px 0px 0px 4px,
            rgb(209 209 209) 0px 0px 0px 8px,
            rgb(158 162 163) 0px 0px 0px 12px;
        `}
      `}
      {...rests}
    >
      {children}
    </div>
  );
});

export default BoxList;
