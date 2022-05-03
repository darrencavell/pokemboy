/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import React, { useEffect, useRef, useState } from 'react';

import { useQuery, gql } from '@apollo/client';

import { useStore } from './lib/context';
import GameEngine from './components/GameEngine';
import Background from './components/Background';
import Battle from './components/Battle';
import Message from './components/Message';
import { ENCOUNTER_POKEMON, EVENTS, FADE, GAME_TYPE, MAIN, OVERWORLD, TEXT_MESSAGE } from './lib/constant';
import Overworld from './components/Overworld';
import { handleEvent } from './components/event/event';
import MoveableMap from './components/canvas/MoveableMap';
import Person from './components/Person';
import Fade from './components/Fade';
import { getScaleByGameType, getSizesByGameType, getSrcByGameType } from './lib/utils';

const Home = () => {
  // const GET_POKEMONS = gql`
  //   query pokemons($limit: Int, $offset: Int) {
  //     pokemons(limit: $limit, offset: $offset) {
  //       count
  //       next
  //       previous
  //       status
  //       message
  //       results {
  //         url
  //         name
  //         image
  //       }
  //     }
  //   }
  // `;
  
  // const gqlVariables = {
  //   limit: 2,
  //   offset: 1,
  // };

  // const { loading, error, data } = useQuery(GET_POKEMONS, {
  //   variables: gqlVariables,
  // });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // console.log('Response from server', data);
  // const canvasRef = useRef();

  const { store, dispatch } = useStore();

  const [id, setId] = useState(0);
  const requestRef = useRef();

  const FPS = 30;
  let previousTime = window.performance.now();

  const getCharacterBehaviour = () => {
    const main = new Person(
      {
        ...store.app.main,
        isTriggeringCanvas: false,
        behaviour: {
          type: 'walk',
          direction: store.app.directions[0]
        }
      },
      store.app.walls
    );
    main.update();
    
    let nextId = id;
    if (main.parameters.isTriggeringCanvas) {
      nextId++;
    }

    if (id !== nextId) {
      setId(nextId);
      dispatch({
        type: MAIN,
        payload: {
          ...store.app.main,
          ...main.parameters
        }
      });
    }
  }

  const getCutsceneBehaviour = () => {
    const event = store.app.events[0];

    switch(event.type) {
      case TEXT_MESSAGE:
        dispatch({ type: TEXT_MESSAGE, payload: event.payload });
        break;
      case FADE:
        dispatch({ type: FADE, payload: event.payload });
        break;
      case GAME_TYPE:
        dispatch({ type: GAME_TYPE, payload: event.payload });
        
        const currentEvents = [...store.app.events];
        currentEvents.splice(0, 1);

        dispatch({ type: EVENTS, payload: currentEvents });
        break;
    }
  }

  const getNextBehaviour = () => {
    return store.app.events.length > 0 ? getCutsceneBehaviour : getCharacterBehaviour;
  }

  const animate = (currentTime) => {
    const deltaTime = currentTime - previousTime;
    
    if (deltaTime < (1000 / FPS)) return;
    
    previousTime = currentTime;

    requestRef.current = requestAnimationFrame(getNextBehaviour());
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    if (store.app.directions) {
      if (store.app.events.length === 0) {
        requestRef.current = requestAnimationFrame(getCharacterBehaviour);
      }
    }
  }, [store.app.directions]);

  useEffect(() => {
    if (store.app.events.length > 0) {
      requestRef.current = requestAnimationFrame(getCutsceneBehaviour);
    }
  }, [store.app.events]);

  useEffect(() => {
    if (store.app.events.length === 0) {
      requestRef.current = requestAnimationFrame(getCharacterBehaviour);

      if (!store.app.main.behaviour && store.app.main.isEncounteringWildPokemon) {
        dispatch({
          type: MAIN,
          payload: {
            ...store.app.main,
            x: store.app.main.x,
            y: store.app.main.y
          }
        });
        const currentEvents = [...store.app.events];
        currentEvents.push({ type: FADE, payload: 'toWhite' });
        currentEvents.push({ type: GAME_TYPE, payload: ENCOUNTER_POKEMON });
        dispatch({
          type: EVENTS,
          payload: currentEvents
        });
      }
    }
  }, [store.app.main]);

  useEffect(() => {
    console.log(store);
  }, [store]);

  const handleMessageClose = () => {
    const currentEvents = [...store.app.events];
    currentEvents.splice(0, 1);

    dispatch({ type: EVENTS, payload: currentEvents });
    dispatch({ type: TEXT_MESSAGE, payload: '' });
  }

  const handleFaderTransitionEnd = () => {
    const currentEvents = [...store.app.events];
    currentEvents.splice(0, 1);
    
    dispatch({ type: EVENTS, payload: currentEvents });
    dispatch({ type: FADE, payload: '' });
  }

  return (
    <>
      <Background />
      <GameEngine>
        <MoveableMap
          overridenCss={css`
            ${store.app.gameType === ENCOUNTER_POKEMON && css`
              display: flex;
              justify-content: center;
              object-position: top;
              width: 100%;
              height: 100%;
              transform: unset;
            `}
          `}
          src={getSrcByGameType(store.app.gameType)}
          direction={store.app.directions[0]}
          main={store.app.main}
          sizes={getSizesByGameType(store.app.gameType)}
          scale={getScaleByGameType(store.app.gameType)}
        />
        {store.app.gameType === OVERWORLD && <Overworld />}
        {store.app.gameType === ENCOUNTER_POKEMON && <Battle />}
        <Message
          content={store.app.textMessage}
          onClose={handleMessageClose}
        />
        <Fade
          content={store.app.fader}
          onTransitionEnd={handleFaderTransitionEnd}
        />
      </GameEngine>
    </>
  )
}

export default Home;
