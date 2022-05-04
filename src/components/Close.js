/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import Box from './Box/Box';

const Close = props => {
  const { overridenCss, onClose } = props;

  return (
    <div css={css`
      position: absolute;
      top: 16px;
      right: 16px;
      ${overridenCss}
    `}>
      <Box>
        <div css={css`
          position: relative;
          background-color: rgb(245, 245, 245);
          z-index: 2;
          width: 100%;
          width: 72px;
          height: 72px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}>
          <img
            css={css`
              image-rendering: pixelated;
              width: 48px;
              height: 48px;
            `}
            src="/assets/earth.png"
            onClick={onClose}
          />
        </div>
      </Box>
    </div>
  )
}

export default Close;
