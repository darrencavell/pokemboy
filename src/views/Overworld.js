/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { css } from '@emotion/react';

import AnimatedPerson from '../components/CanvasMap/AnimatedPerson';
import MoveableMap from '../components/CanvasMap/MoveableMap';
import UserController from '../components/InputController/UserController';
import Menu from '../components/Menu';
import Icon from '../components/Icon';

import { useStore } from '../lib/context';
import {
  DIRECTIONS,
  EVENTS,
  FADE,
  GAME_TYPE,
  MYPOKEMON,
  POKEDEX,
  TEXT_MESSAGE
} from '../lib/constant';
import localStorage from '../lib/localStorage';

const Overworld = props => {
  const { store, dispatch } = useStore();

  const map = {
    sizes: {
      width: 320,
      height: 320
    },
    scale: 4,
    src: '/assets/lavaridge.png'
  };

  const [state, setState] = useState({
    selectedMenu: 0,
    isMenuOpen: false,
    menus: [
      {
        id: 'pokedex',
        text: 'Pokedex',
        description: 'Observe and take a closer look to all the pokemons'
      },
      {
        id: 'my-pokemon',
        text: 'My Pokemon',
        description: 'Preview your captured pokemon'
      },
      {
        id: 'save',
        text: 'Save',
        description: 'Save your current progress so far!'
      }
    ]
  });

  const [description, setDescription] = useState(state.menus[0].description);
  const descriptionRef = useCallback(node => {
    if (node) {
      node.innerText = description;
    }
  }, [description]);

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
      case 'save':
        localStorage.add('pokemboy', JSON.stringify(store));
        currentEvents.push({ type: TEXT_MESSAGE, payload: 'Current progress saved successfully!' });
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
    });
    setDescription(payload.description);
  }

  const handleDirection = directions => {
    dispatch({ type: DIRECTIONS, payload: directions });
  }

  return (
    <>
      <div css={css`
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}>
        <MoveableMap
          src="/assets/lavaridge.png"
          direction={store.app.directions[0]}
          main={store.app.main}
          sizes={map.sizes}
          scale={map.scale}
        />
      </div>
      <UserController
        events={store.app.events}
        directions={store.app.directions}
        onDirection={handleDirection}
      />
      {store.app.events.length === 0 && (
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
                top: 229px !important;
                left: 16px !important;
                bottom: unset !important;
                z-index: 5;
              `}
              ref={descriptionRef}
              onClick={handleClickMenu}
              onCursorEnter={handleCursorEnterMenu}
              menus={state.menus}
              selectedMenu={state.selectedMenu}
              isAnimating={false}
            />
          )}
        </>
      )}
      <AnimatedPerson
        src="/assets/brendan.png"
        gameObject={store.app.main}
        scale={1}
      />
    </>
  );
}

export default Overworld;
