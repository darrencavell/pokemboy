/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import Box from '../Box/Box';

const Button = props => {
  const { children, color, height, type, ...rest } = props;

  let backgroundColor;
  switch (type) {
    case 'primary':
      backgroundColor = '#1890FF';
      break;
    case 'danger':
      backgroundColor = '#ff4d4f';
      break;
    case 'secondary':
    default:
      backgroundColor = '#ffffff';
      break;
  }

  return (
    <Box>
      <div css={css`
        position: relative;
        background-color: #ffffff;
        display: flex;
        z-index: 2;
      `}>
        <button
          css={css`
            background-color: ${backgroundColor};
            color: ${color || '#000000'};
            height: ${height || 'initial'};
            border: 0;
            outline: 0;
            width: 100%;
          `}
          {...rest}
        >
          {children}
        </button>
      </div>
    </Box>

  )
}

export default Button;
