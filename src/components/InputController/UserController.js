import React from 'react';

import KeyboardController from './KeyboardController';
import PadController from './PadController';

const UserController = props => {
  const { directions, events, onDirection } = props;

  const handlePressed = (arrow, queue) => {
    if (queue.indexOf(arrow) !== -1) {
      return queue;
    }

    return [arrow, ...queue];
  }
  const handleReleased = (arrow, queue) => {
    return queue.filter(currentArrow => currentArrow !== arrow);
  }

  return (
    <>
      <KeyboardController
        directions={directions}
        onDirection={onDirection}
        onPressed={handlePressed}
        onReleased={handleReleased}
      />
      <PadController
        events={events}
        directions={directions}
        onDirection={onDirection}
        size={6}
        onPressed={handlePressed}
        onReleased={handleReleased}
      />
    </>
  )
}

export default UserController;
