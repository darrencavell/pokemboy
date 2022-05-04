/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useStore } from '../lib/context';
import Box from './box/Box';
import Menu from './Menu';
import { EVENTS, FADE, GAME_TYPE, MYPOKEMON, POKEDEX } from '../lib/constant';
import Icon from './Icon';

const Navigation = props => {
  const { store, dispatch } = useStore();

  const descriptionRef = useRef();

  const [state, setState] = useState({
    selectedMenu: 0,
    isMenuOpen: false,
  });

  const menus = [
    {
      id: 'pokedex',
      text: 'Pokedex',
      description: 'Observe and take a closer look to all the pokemons'
    },
    {
      id: 'my-pokemon',
      text: 'My Pokemon',
      description: 'Preview your captured pokemon'
    }
  ];

  const handleClickNavigation = () => {
    setState({
      ...state,
      isMenuOpen: !state.isMenuOpen
    })
  }

  const handleClickMenu = (payload) => {
    const currentEvents = [...store.app.events];

    switch (payload.id) {
      case 'pokedex':
        currentEvents.push({ type: FADE, payload: 'toWhite' });
        currentEvents.push({ type: GAME_TYPE, payload: POKEDEX });
        dispatch({
          type: EVENTS,
          payload: currentEvents
        });
        break;
      case 'my-pokemon':
        currentEvents.push({ type: FADE, payload: 'toWhite' });
        currentEvents.push({ type: GAME_TYPE, payload: MYPOKEMON });
        dispatch({
          type: EVENTS,
          payload: currentEvents
        });
        break;
    }
  }

  const handleCursorEnterMenu = (payload, index) => {
    setState({
      ...state,
      selectedMenu: index
    })
    descriptionRef.current.innerText = payload.description;
  }

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerText = menus[0].description;
    }
  }, [state.isMenuOpen]);


  return store.app.events.length === 0 && (
    <>
      <Icon src="/assets/pc.png" onClick={handleClickNavigation} />
      {state.isMenuOpen && (
        <Menu
          menuOverridenCss={css`
            right: 16px !important;
            top: 104px !important;
            left: unset !important;
            bottom: unset !important;
            z-index: 5;
          `}
          descriptionOverridenCss={css`
            right: 16px !important;
            top: 194px !important;
            left: 16px !important;
            bottom: unset !important;
            z-index: 5;
          `}
          ref={descriptionRef}
          onClick={handleClickMenu}
          onCursorEnter={handleCursorEnterMenu}
          menus={menus}
          selectedMenu={state.selectedMenu}
          isAnimating={false}
        />
      )}
    </>
  );
}

export default Navigation;
