/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Box from '../box/Box';

const TextInput = props => {
  const { height, ...rest } = props;
  return (
    <Box>
      <div css={css`
        position: relative;
        display: flex;
      `}>
        <input
          css={css`
            position: relative;
            background: #ffffff;
            height: ${height || 'initial'};
            z-index: 1;
            border: 0;
            outline: 0;
            width: 100%;
          `}
          {...rest}
        />
      </div>
    </Box>
  )
}

export default TextInput;
