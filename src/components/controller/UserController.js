import React, { useState } from 'react';

import KeyboardController from './KeyboardController';
import PadController from './PadController';

const UserController = props => {
  const { render } = props;

  const [arrows, setArrows] = useState([]);

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
        arrows={arrows}
        setArrows={setArrows}
        onPressed={handlePressed}
        onReleased={handleReleased}
      />
      <PadController
        arrows={arrows}
        setArrows={setArrows}
        onPressed={handlePressed}
        onReleased={handleReleased}
      />
      {render(arrows)}
    </>
  )
}

export default UserController;
