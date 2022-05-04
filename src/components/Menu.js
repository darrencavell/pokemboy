/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { css } from '@emotion/react';

import Box from './box/Box';
import BoxList from './box/BoxList';

import { mediaQueries } from '../lib/utils';

const Menu = forwardRef((props, ref) => {
  const {
    isAnimating,
    menus,
    onCursorEnter,
    onClick,
    selectedMenu,
    descriptionOverridenCss,
    menuOverridenCss
  } = props;

  const descriptionBaseCss = css`
    position: absolute;
    ${mediaQueries[0]} {
      left: 50px;
      right: 50px;
      bottom: 48px;
    }
    ${mediaQueries[1]} {
      left: 80px;
      right: 80px;
      bottom: 60px;
    }
    max-width: 750px;
  `;

  const menuBaseCss = css`
    position: absolute;
    ${mediaQueries[0]} {
      left: 30px;
      right: 30px;
    }
    ${mediaQueries[1]} {
      left: 150px;
      right: 150px;
    }
    bottom: 130px;
  `;

  return (
    <>
      <div css={css`
        ${descriptionBaseCss}
        ${descriptionOverridenCss}
      `}>
        <Box>
          <div css={css`
            position: relative;
            background-color: #ffffff;
            z-index: 2;
            width: 100%;
          `}>
            <BoxList padding="8px 16px 8px" ref={ref} />
          </div>
        </Box>
      </div>
      <div css={css`
        ${menuBaseCss}
        ${menuOverridenCss}
      `}>
        <Box>
          <div css={css`
            position: relative;
            background-color: #ffffff;
            z-index: 2;
            width: 100%;
          `}>
            {menus.map((menu, index) => {
              return (
                <BoxList
                  key={menu.id}
                  padding="8px 16px 8px"
                  disabled={selectedMenu === index ? isAnimating : false}
                  highlightable={selectedMenu === index}
                  onMouseEnter={() => onCursorEnter(menu, index)}
                  onTouchStart={() => onCursorEnter(menu, index)}
                  onClick={() => onClick(menu)}
                >
                  {menu.text}
                </BoxList>
              );
            })}
          </div>
        </Box>
      </div>
    </>
  );
});

export default Menu;
