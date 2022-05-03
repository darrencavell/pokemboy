import React from 'react';

import KeyboardController from './KeyboardController';
import PadController from './PadController';

import { useStore } from '../../lib/context';
import { DIRECTIONS } from '../../lib/constant';

const UserController = props => {
  const { events } = props;

  const { store, dispatch } = useStore();

  const handlePressed = (arrow, queue) => {
    if (queue.indexOf(arrow) !== -1) {
      return queue;
    }

    return [arrow, ...queue];
  }
  const handleReleased = (arrow, queue) => {
    return queue.filter(currentArrow => currentArrow !== arrow);
  }

  const handleSetDirections = directions => {
    dispatch({ type: DIRECTIONS, payload: directions });
  }

  return (
    <>
      <KeyboardController
        arrows={store.app.directions}
        setArrows={handleSetDirections}
        onPressed={handlePressed}
        onReleased={handleReleased}
      />
      <PadController
        events={events}
        arrows={store.app.directions}
        setArrows={handleSetDirections}
        onPressed={handlePressed}
        onReleased={handleReleased}
      />
    </>
  )
}

export default UserController;
