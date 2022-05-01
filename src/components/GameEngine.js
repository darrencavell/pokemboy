/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

const GameEngine = props => {
  const { children } = props;

  const pixelSize = 16;
  const innerScreenSize = (32 * pixelSize) * 7;

  return (
    <div css={css`
      overflow: hidden;
      display: flex;
      justifyContent: center;
      alignItems: center;
      background: rgb(154, 195, 207);
    `}>
      <main css={css`
        position: relative;
        width: 100vw;
        height: 100vh;
      `}>
        {children}
      </main>
    </div>
  )
}

export default GameEngine;
