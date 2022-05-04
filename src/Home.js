/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { useEffect, useRef, useState } from 'react';

import { useQuery, useLazyQuery } from '@apollo/client';

import { useStore } from './lib/context';
import GameEngine from './components/GameEngine';
import Background from './components/Background';
import Battle from './components/Battle';
import Message from './components/Message';
import { ENCOUNTER_POKEMON, EVENTS, FADE, GAME_TYPE, GRAPHQL, MAIN, MYPOKEMON, OVERWORLD, POKEDEX, TEXT_MESSAGE } from './lib/constant';
import Overworld from './components/Overworld';
import Pokedex from './components/Pokedex';
import { handleEvent } from './components/event/event';
import MoveableMap from './components/canvas/MoveableMap';
import Person from './components/Person';
import Fade from './components/Fade';
import { getMapByGameType } from './lib/utils';
import { GET_POKEMONS, GET_POKEMON_DETAIL } from './lib/graphql/queries';
import localStorage from './lib/localStorage';
import MyPokemon from './components/MyPokemon';

const Home = () => {
  const { store, dispatch } = useStore();

  const { loading: loadingGetPokemons, data: dataGetPokemons, fetchMore: fetchMoreGetPokemons } = useQuery(GET_POKEMONS, {
    variables: {
      limit: store.app.graphql.pokemons.limit,
      offset: store.app.graphql.pokemons.offset,
    },
  });

  const [getPokemonDetail, { loading: loadingGetPokemonDetail, data: dataGetPokemonDetail }] = useLazyQuery(GET_POKEMON_DETAIL)

  const handleRefetch = () => {
    const newOffset = store.app.graphql.pokemons.offset + 10;
    
    const payload = {
      ...store.app.graphql,
      pokemons: {
        ...store.app.graphql.pokemons,
        offset: newOffset,
      }
    };

    fetchMoreGetPokemons({
      limit: store.app.graphql.pokemons.limit,
      offset: newOffset,
    });

    dispatch({
      type: GRAPHQL,
      payload
    });
  }

  // if (loadingGetPokemons) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  const [id, setId] = useState(0);
  const requestRef = useRef();

  const FPS = 30;
  let previousTime = window.performance.now();

  const map = getMapByGameType(store.app.gameType);

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
      store.app.walls,
      store.app.graphql.pokemons.data
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

        localStorage.add('pokemboy', JSON.stringify(store));

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

  useEffect(() => {
    if (dataGetPokemons) {
      const currentData = dataGetPokemons?.pokemons?.results;
      
      const existingData = [
        ...store.app.graphql.pokemons.data,
        ...currentData
      ];
  
      const payload = {
        ...store.app.graphql,
        pokemons: {
          ...store.app.graphql.pokemons,
          data: existingData
        }
      }
  
      dispatch({
        type: GRAPHQL,
        payload
      });
    }
  }, [dataGetPokemons]);

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
        <div css={css`
          position: absolute;
          overflow: hidden;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}>
          <MoveableMap
            overridenCss={css`
              ${store.app.gameType === ENCOUNTER_POKEMON && css`
                transform: unset;
              `}
              ${store.app.gameType === POKEDEX && css`
                transform: unset;
                object-fit: contain;
              `}
              ${store.app.gameType === MYPOKEMON && css`
                transform: unset;
                object-fit: cover;
              `}
            `}
            src={map.src}
            direction={store.app.directions[0]}
            main={store.app.main}
            sizes={map.sizes}
            scale={map.scale}
          />
        </div>
        {store.app.gameType === OVERWORLD && <Overworld />}
        {store.app.gameType === ENCOUNTER_POKEMON && (
          <Battle
            data={dataGetPokemonDetail?.pokemon}
            loading={loadingGetPokemonDetail}
            onFetch={getPokemonDetail}
          />
        )}
        {store.app.gameType === POKEDEX && (
          <Pokedex
            data={dataGetPokemons?.pokemons?.results || []}
            loading={loadingGetPokemons}
            onFetchMore={handleRefetch}
          />
        )}
        {store.app.gameType === MYPOKEMON && (
          <MyPokemon
            data={store.app.main.myPokemons}
          />
        )}
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
