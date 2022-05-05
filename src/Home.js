/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import { useQuery, useLazyQuery } from '@apollo/client';

import Background from './components/Background';
import Message from './components/Message/Message';
import Person from './components/Person';
import Fade from './components/Fade/Fade';
import Loading from './components/Loading';

import { useStore } from './lib/context';
import { GET_POKEMONS, GET_POKEMON_DETAIL } from './lib/graphql/queries';
import {
  DIRECTIONS,
  ENCOUNTER_POKEMON,
  EVENTS,
  FADE,
  GAME_TYPE,
  GRAPHQL,
  MAIN,
  MYPOKEMON,
  OVERWORLD,
  POKEDEX,
  TEXT_MESSAGE,
  SPLASH_SCREEN,
  STATE
} from './lib/constant';

const Battle = lazy(() => import('./views/Battle'));
const Overworld = lazy(() => import('./views/Overworld'));
const Pokedex = lazy(() => import('./views/Pokedex'));
const MyPokemon = lazy(() => import('./views/MyPokemon'));
const SplashScreen = lazy(() => import('./views/SplashScreen'));

const Home = () => {
  const { store, dispatch } = useStore();
  
  const { loading: loadingGetPokemons, data: dataGetPokemons, fetchMore: fetchMoreGetPokemons } = useQuery(GET_POKEMONS, {
    variables: {
      limit: store.app.graphql.pokemons.limit,
      offset: 0,
    }
  });

  const [getPokemonDetail, { loading: loadingGetPokemonDetail, data: dataGetPokemonDetail }] = useLazyQuery(GET_POKEMON_DETAIL)

  const handleRefetch = () => {
    fetchMoreGetPokemons({
      variables: {
        offset: dataGetPokemons.pokemons.results.length,
      }
    });
  }

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
          direction: store.app.main.isEncounteringWildPokemon ? null : store.app.directions[0]
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

    const currentEvents = [...store.app.events];

    switch(event.type) {
      case TEXT_MESSAGE:
        dispatch({ type: TEXT_MESSAGE, payload: event.payload });
        break;
      case FADE:
        dispatch({ type: FADE, payload: event.payload });
        break;
      case GAME_TYPE:
        dispatch({ type: GAME_TYPE, payload: event.payload });
        
        currentEvents.splice(0, 1);

        dispatch({ type: EVENTS, payload: currentEvents });
        break;
      case STATE:
        dispatch({ type: STATE, payload: event.payload });

        currentEvents.splice(0, 1);

        dispatch({ type: EVENTS, payload: currentEvents });
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
    if (store.app.events.length === 0) {
      if (!store.app.main.isEncounteringWildPokemon) {
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
            y: store.app.main.y,
            isTriggeringCanvas: false,
            isEncounteringWildPokemon: false,
            movingProgress: 0,
            currentBehaviour: null,
            behaviour: {
              type: '',
              direction: ''
            }
          }
        });

        dispatch({ type: DIRECTIONS, payload: [] });

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
    if (dataGetPokemons) {
      const newData = dataGetPokemons?.pokemons?.results;

      const payload = {
        ...store.app.graphql,
        pokemons: {
          ...store.app.graphql.pokemons,
          data: newData
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
    <Suspense fallback={<Loading />}>
      <Background />
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
        {store.app.gameType === SPLASH_SCREEN && <SplashScreen />}
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
            dataPokemon={dataGetPokemons?.pokemons || {}}
            dataPokemonDetail={dataGetPokemonDetail?.pokemon}
            loadingDataPokemon={loadingGetPokemons}
            loadingDataPokemonDetail={loadingGetPokemonDetail}
            onFetchMore={handleRefetch}
            onFetchDetail={getPokemonDetail}
          />
        )}
        {store.app.gameType === MYPOKEMON && (
          <MyPokemon
            data={store.app.main.myPokemons}
            dataPokemonDetail={dataGetPokemonDetail?.pokemon}
            loadingDataPokemonDetail={loadingGetPokemonDetail}
            onFetchDetail={getPokemonDetail}
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
      </div>
    </Suspense>
  )
}

export default Home;
