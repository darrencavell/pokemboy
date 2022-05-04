/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

const GameEngine = props => {
  const { children } = props;

  return (
    <div css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 100%;
      max-width: 750px;
      height: 100vh;
      position: relative;
    `}>
      {children}
    </div>
  )
}

export default GameEngine;
