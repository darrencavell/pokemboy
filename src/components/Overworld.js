import AnimatedPerson from './canvas/AnimatedPerson';

import { useStore } from '../lib/context';
import UserController from './controller/UserController';
import Navigation from './Navigation';

const Overworld = props => {
  const { store } = useStore();

  return (
    <>
      <UserController
        events={store.app.events}
      />
      <Navigation />
      <AnimatedPerson
        src="/assets/brendan.png"
        gameObject={store.app.main}
        scale={1}
      />
    </>
  );
}

export default Overworld;
