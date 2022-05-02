/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import MoveableMap from './canvas/MoveableMap';
import AnimatedPerson from './canvas/AnimatedPerson';

import Person from './Person';

import { usePrevious } from '../hooks/usePrevious';
import { handleEvent } from './event/event';
import { useStore } from '../lib/context';
import { ENCOUNTER_POKEMON, EVENTS, GAME_TYPE } from '../lib/constant';

const Overworld = props => {
  const { direction } = props;

  const [id, setId] = useState(0);
  const [state, setState] = useState({
    main: {
      x: 5,
      y: 5,
      behaviour: {
        type: '',
        direction: ''
      },
      currentBehaviour: null,
      movingProgress: 0,
      isEncounteringWildPokemon: false
    },
    walls: {
      '1x7': true,
      '1x8': true,
      '1x9': true,
      '1x10': true,
      '1x16': true,
      '2x6': true,
      '2x11': true,
      '2x15': true,
      '2x17': true,
      '3x6': true,
      '3x11': true,
      '3x15': true,
      '3x18': true,
      '4x6': true,
      '4x11': true,
      '4x15': true,
      '4x19': true,
      '5x6': true,
      '5x11': true,
      '5x15': true,
      '5x19': true,
      '6x6': true,
      '6x11': true,
      '6x15': true,
      '6x19': true,
      '7x6': true,
      '7x11': true,
      '7x12': true,
      '7x13': true,
      '7x14': true,
      '7x15': true,
      '7x19': true,
      '8x6': true,
      '8x19': true,
      '9x19': true,
      '10x6': true,
      '10x19': true,
      '11x6': true,
      '11x12': true,
      '11x13': true,
      '11x14': true,
      '11x15': true,
      '11x19': true,
      '12x6': true,
      '12x12': true,
      '12x15': true,
      '12x19': true,
      '13x6': true,
      '13x8': true,
      '13x12': true,
      '13x15': true,
      '13x8': true,
      '13x19': true,
      '14x5': true,
      '14x12': true,
      '14x15': true,
      '14x16': true,
      '14x19': true,
      '15x12': true,
      '15x15': true,
      '15x19': true,
      '16x5': true,
      '16x12': true,
      '16x15': true,
      '16x19': true,
      '17x5': true,
      '17x12': true,
      '17x15': true,
      '17x19': true,
      '18x6': true,
      '18x12': true,
      '18x16': true,
      '18x17': true,
      '18x18': true,
      '19x6': true,
    }
  });
  const prevState = usePrevious(state);
  const requestRef = useRef();
  const { store, dispatch } = useStore();

  useEffect(() => {
    if (direction) {
      if (store.app.events.length === 0) {
        requestRef.current = requestAnimationFrame(getCharacterBehaviour);
      }
    }
  }, [direction]);

  useEffect(() => {
    if (prevState?.main !== state?.main) {
      if (store.app.events.length === 0) {
        requestRef.current = requestAnimationFrame(getCharacterBehaviour);

        console.log('state.main', state.main);
        if (!state.main.behaviour && state.main.isEncounteringWildPokemon) {
          const newEvents = [...store.app.events];
          newEvents.push({
            type: GAME_TYPE,
            payload: ENCOUNTER_POKEMON
          });
          dispatch({ type: EVENTS, payload: newEvents });
        }
      }
    }
  }, [state]);

  useEffect(() => {
    if (store.app.textMessage === '') {
      const remainingEvents = [...store.app.events];
      remainingEvents.splice(0, 1);
      dispatch({ type: EVENTS, payload: remainingEvents });
    }
  }, [store.app.textMessage]);
  
  useEffect(() => {
    if (store.app.events.length > 0) {
      requestRef.current = requestAnimationFrame(getCutsceneBehaviour);
    }
  }, [store.app.events]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const FPS = 30;
  let previousTime = window.performance.now();

  const getCharacterBehaviour = () => {
    const main = new Person(
      {
        ...state.main,
        isTriggeringCanvas: false,
        behaviour: {
          type: 'walk',
          direction: direction[0]
        }
      },
      state.walls
    );
    main.update();
    
    let nextId = id;
    if (main.parameters.isTriggeringCanvas) {
      nextId++;
    }

    if (id !== nextId) {
      setId(nextId);
      setState({
        ...state,
        main: {
          ...state.main,
          ...main.parameters
        }
      });
    }
  }

  const getCutsceneBehaviour = () => {
    const event = store.app.events[0];
    console.log('getCutsceneBehaviour', event);
    handleEvent(event, dispatch);
  }
  

  useEffect(() => {
    console.log('store', store);
  }, [store]);

  const getNextBehaviour = () => {
    console.log(store.app.events.length);
    return store.app.events.length > 0 ? getCutsceneBehaviour : getCharacterBehaviour;
  }

  const animate = (currentTime) => {
    requestRef.current = requestAnimationFrame(getNextBehaviour());

    const deltaTime = currentTime - previousTime;
    
    if (deltaTime < (1000 / FPS)) return;
    
    previousTime = currentTime;
  }

  return (
    <div css={css`
      position: relative;
    `}>
      <MoveableMap
        src="/assets/lavaridge.png"
        gameObject={state.main}
        scale={4}
      />
      <AnimatedPerson
        src="/assets/brendan.png"
        gameObject={state.main}
        scale={1}
      />
    </div>
  );
}

export default Overworld;
