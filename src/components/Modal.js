/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const Modal = props => {
  const { children, isVisible } = props;

  return (
    <div css={css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      visibility: ${isVisible ? 'visible' : 'hidden'};
      transition: visibility 0.5s ease;
    `}>
      <div css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: ${isVisible ? '1' : '0'};
        transition: opacity 0.5s ease;
        filter: blur(4px);
      `}></div>
      {children}
    </div>
  )
}

export default Modal;
