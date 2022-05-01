import { useState } from 'react';

import UserController from './controller/UserController';
import Overworld from './Overworld';
import Person from './Person';

const OverworldWrapper = props => {

  const [state, setState] = useState({
    events: [
      { type: 'ENCOUNTER_POKEMON' }
    ]
  });

  return (
    <>
      <UserController
        render={(direction) => {
          return (
            <Overworld
              direction={direction}
              events={state.events}
            />
          );
        }}/>
    </>
  )
}

export default OverworldWrapper;