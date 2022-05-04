/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { usePrevious } from '../../lib/hooks/usePrevious';

const FadeWhite = props => {
  const { content, onTransitionEnd } = props;

  const prevProps = usePrevious(props);

  const [state, setState] = useState({
    time: 0,
    opacity: 0
  });

  useEffect(() => {
    if (prevProps?.content !== content) {
      if (content === 'toWhite') {
        setState({
          time: 1800,
          opacity: 1,
        });
      }
    }
  });
  
  if (content) {
    return (
      <div
        css={css`
          transition: opacity ${state.time}ms ease;
          background-color: #ffffff;
          opacity: ${state.opacity};
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
        `}
        onTransitionEnd={onTransitionEnd}
      ></div>
    );
  }

  return null;
}

export default FadeWhite;
