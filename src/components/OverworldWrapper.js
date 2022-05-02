import { useStore } from '../lib/context';
import UserController from './controller/UserController';
import Overworld from './Overworld';

const OverworldWrapper = props => {
  const { store } = useStore();

  return (
    <>
      <UserController
        events={store.app.events}
        render={(direction) => {
          return (
            <Overworld
              direction={direction}
            />
          );
        }}/>
    </>
  )
}

export default OverworldWrapper;