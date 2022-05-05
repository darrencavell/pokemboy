/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { css } from '@emotion/react';

import Box from '../components/Box/Box';
import BoxList from '../components/Box/BoxList';

import { useStore } from '../lib/context';
import localStorage from '../lib/localStorage';
import {
  EVENTS,
  GAME_TYPE,
  OVERWORLD,
  STATE,
  TEXT_MESSAGE
} from '../lib/constant';

const SplashScreen = props => {
  const [state, setState] = useState({
    selectedMenu: 0,
    menus: [
      {
        id: 'new-game',
        text: 'New Game',
        disabled: false
      },
      {
        id: 'continue-game',
        text: 'Continue Game',
        disabled: false
      }
    ]
  });

  const { store, dispatch } = useStore();

  const handleCursorEnterMenu = (_, index) => {
    setState({
      ...state,
      selectedMenu: index
    });
  }

  const handleClickMenu = (payload) => {
    const currentEvents = [...store.app.events];

    const overworld = { type: GAME_TYPE, payload: OVERWORLD };
    const eventPresets = [
      overworld,
      { type: TEXT_MESSAGE, payload: 'Welcome to Pokemboy! I am glad you are here.' },
      { type: TEXT_MESSAGE, payload: 'Here\' a little simulator to experience the journey of playing pokemon in my childhood!' },
      { type: TEXT_MESSAGE, payload: 'Hope you enjoy!' },
    ];

    switch (payload.id) {
      case 'new-game':
        currentEvents.push(...eventPresets);
        dispatch({
          type: EVENTS,
          payload: currentEvents
        });
        break;
      case 'continue-game':
        const saveFile = localStorage.get('pokemboy');

        if (!saveFile) {
          currentEvents.push({ type: TEXT_MESSAGE, payload: 'You don\'t have a save file, we should proceed with a new game then!' });
          currentEvents.push(...eventPresets);
          dispatch({
            type: EVENTS,
            payload: currentEvents
          });
        } else {
          currentEvents.push({ type: STATE, payload: JSON.parse(saveFile) });
          currentEvents.push(overworld);
          dispatch({
            type: EVENTS,
            payload: currentEvents
          });
        }
        
        break;
    }
  }

  return (
    <div css={css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    `}>
      <div css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}>
        <Box>
          <div css={css`
            background-color: #ffffff;
            position: relative;
            z-index: 2;
          `}>
            <img
              src="/assets/pokemboy.png"
              srcSet="/assets/pokemboy-high.png 2x"
              width={320}
              height={320}
              alt="pokemboy-splash-screen"
            />
            <div css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding-bottom: 48px;
            `}>
              <div css={css`
                width: 200px;
                text-align: center;
              `}>
                {state.menus.map((menu, index) => {
                  return (
                    <BoxList
                      key={menu.id}
                      padding="8px 16px 8px"
                      disabled={false}
                      highlightable={state.selectedMenu === index}
                      onMouseEnter={() => handleCursorEnterMenu(menu, index)}
                      onTouchStart={() => handleCursorEnterMenu(menu, index)}
                      onClick={() => handleClickMenu(menu)}
                    >
                      {menu.text}
                    </BoxList>
                  );
                })}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default SplashScreen;
