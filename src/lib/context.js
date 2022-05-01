import { createContext, useContext, useEffect, useReducer, useRef } from 'react';

import storeReducer from './store/reducer';
import { INITIALIZE_CANVAS } from './store/app/reducer';

const GameEngineContext = createContext({
  state: {},
});

export const useStore = () => useContext(GameEngineContext);

export const GameEnginerProvider = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(storeReducer, {});

  return (
    <GameEngineContext.Provider value={{ state, dispatch }}>
      {children}
    </GameEngineContext.Provider>
  )
}
