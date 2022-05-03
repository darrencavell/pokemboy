/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';

import { TEXT_MESSAGE } from '../../lib/constant';
import { useStore } from '../../lib/context';

import Box from '../box/Box';
import BoxList from '../box/BoxList';

const TextMessage = props => {
  const { content, onClose } = props;

  const breakpoints = [0, 768];
  const mediaQueries = breakpoints.map(breakpoint => `@media (min-width: ${breakpoint}px)`);
  const blink = keyframes`
    to { visibility: hidden; }
  `;

  return (
    <div
      css={css`
        position: absolute;
        ${mediaQueries[0]} {
          left: 50px;
          right: 50px;
          bottom: 48px;
        }
        ${mediaQueries[1]} {
          left: 80px;
          right: 80px;
          bottom: 80px;
        }
        max-width: 750px;
      `}
      onClick={onClose}
    >
      <Box>
        <div css={css`
          position: relative;
          background-color: #ffffff;
          z-index: 2;
          width: 100%;
        `}>
          <BoxList padding="8px 16px 8px">
            {content}
            <div css={css`
              position: absolute;
              right: 0px;
              bottom: 0px;
              width: 12px;
              height: 12px;
              background: #000000;
              margin-right: 12px;
              margin-bottom: 8px;
              animation: 0.9s steps(2, start) 0s infinite normal none running ${blink};
            `}></div>
          </BoxList>
        </div>
      </Box>
    </div>
  )
}

export default TextMessage;
