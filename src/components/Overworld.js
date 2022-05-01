/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import CanvasMap from './canvas/CanvasMap';
import CanvasPerson from './canvas/CanvasPerson';
import Person from './Person';
import { usePrevious } from '../hooks/usePrevious';

const Overworld = props => {
  const { direction, events } = props;

  const [id, setId] = useState(0);
  const [state, setState] = useState({
    main: {
      x: 5,
      y: 5,
      behavior: {
        type: '',
        direction: ''
      },
      currentBehavior: null,
      movingProgress: 0
    }
  });
  const prevState = usePrevious(state);
  const requestRef = useRef();

  useEffect(() => {
    if (direction) {
      if (events.length === 0) {
        requestAnimationFrame(getMainCharacterBehaviour);
      }
    }
  }, [direction]);

  useEffect(() => {
    if (prevState?.main !== state?.main) {
      if (events.length === 0) {
        requestRef.current = requestAnimationFrame(getMainCharacterBehaviour);
      }
    }
  }, [state]);

  const FPS = 30;
  let previousTime = window.performance.now();

  const getMainCharacterBehaviour = (id) => {
    const main = new Person({
      ...state.main,
      isTriggeringCanvas: false,
      behavior: {
        type: 'walk',
        direction: direction[0]
      }
    });
    main.update();
    
    let nextId = id;
    if (main.parameters.isTriggeringCanvas) {
      nextId++;
    }

    if (id !== nextId) {
      setId(nextId);
      setState({
        main: {
          ...state.main,
          ...main.parameters
        }
      });
    }
  }

  const getCutsceneBehaviour = () => {
    const event = events[0];
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const animate = (currentTime) => {
    getMainCharacterBehaviour(id);

    const deltaTime = currentTime - previousTime;
    
    if (deltaTime < (1000 / FPS)) return;
    
    previousTime = currentTime;
  }

  return (
    <div css={css`
      position: relative;
    `}>
      <CanvasMap src="/assets/lavaridge.png"
        gameObject={state.main}
        scale={4}
        direction={state.main?.currentBehavior?.direction || ''}
      />
      <CanvasPerson src="/assets/brendan.png"
        gameObject={state.main}
        scale={1}
        direction={state.main?.currentBehavior?.direction || ''}
      />
    </div>
  );
}

export default Overworld;
